package tui

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"charm.land/bubbles/v2/textarea"
	"charm.land/bubbles/v2/textinput"
	"charm.land/bubbles/v2/viewport"
	tea "charm.land/bubbletea/v2"
	"charm.land/lipgloss/v2"

	"packet/internal/packet"
)

type focus int

const (
	focusCollections focus = iota
	focusURL
	focusBody
	focusResponse
)

type viewMode int

const (
	viewSplit viewMode = iota
	viewRequest
	viewResponse
)

type modal int

const (
	modalNone modal = iota
	modalSearch
	modalImport
	modalHeaders
	modalAuth
	modalHelp
)

type requestRef struct {
	collection int
	request    int
}

type responseMsg struct {
	response packet.Response
	err      error
}

type importMsg struct {
	collection packet.Collection
	path       string
	err        error
}

type Model struct {
	width       int
	height      int
	collections []packet.Collection
	visible     []requestRef
	selected    int
	focus       focus
	viewMode    viewMode
	modal       modal
	client      *packet.Client
	body        textarea.Model
	response    viewport.Model
	url         textinput.Model
	search      textinput.Model
	importPath  textinput.Model
	headers     textarea.Model
	authFields  []textinput.Model
	authField   int
	authMode    string
	authAlgo    string
	loading     bool
	last        *packet.Response
	status      string
	statusError bool
}

var (
	accent      = lipgloss.Color("#FFB454")
	cyan        = lipgloss.Color("#59C2FF")
	green       = lipgloss.Color("#AAD94C")
	red         = lipgloss.Color("#F07178")
	dim         = lipgloss.Color("#636A72")
	text        = lipgloss.Color("#BFBDB6")
	panelBorder = lipgloss.Color("#343A40")
	selectedBg  = lipgloss.Color("#27303A")

	brandStyle   = lipgloss.NewStyle().Foreground(accent).Bold(true)
	dimStyle     = lipgloss.NewStyle().Foreground(dim)
	activeStyle  = lipgloss.NewStyle().Foreground(cyan).Bold(true)
	errorStyle   = lipgloss.NewStyle().Foreground(red)
	methodStyle  = lipgloss.NewStyle().Foreground(accent).Bold(true)
	panelStyle   = lipgloss.NewStyle().Border(lipgloss.RoundedBorder()).BorderForeground(panelBorder)
	selectedLine = lipgloss.NewStyle().Background(selectedBg).Foreground(text).Bold(true)
)

func New(collections []packet.Collection, client *packet.Client) Model {
	if len(collections) == 0 {
		collections = []packet.Collection{{Name: "Scratch", Requests: []packet.Request{{Name: "New Request", Method: "GET", URL: "https://httpbin.org/get"}}}}
	}

	body := textarea.New()
	body.Placeholder = "Request body"
	body.Prompt = ""
	body.ShowLineNumbers = true
	body.CharLimit = 0

	urlInput := textinput.New()
	urlInput.Prompt = ""
	urlInput.Placeholder = "https://api.example.com/resource"

	search := textinput.New()
	search.Prompt = "/ "
	search.Placeholder = "Search requests"

	importPath := textinput.New()
	importPath.Prompt = "Path  "
	importPath.Placeholder = "./collection.json"

	headers := textarea.New()
	headers.Prompt = ""
	headers.ShowLineNumbers = false
	headers.Placeholder = "Content-Type: application/json"

	authFields := make([]textinput.Model, 3)
	for i := range authFields {
		authFields[i] = textinput.New()
		authFields[i].Prompt = ""
	}
	authFields[0].Placeholder = "eyJhbGciOi..."
	authFields[1].Placeholder = "signing secret"
	authFields[1].EchoMode = textinput.EchoPassword
	authFields[2].Placeholder = `{"sub":"123"}`

	m := Model{
		collections: collections,
		client:      client,
		focus:       focusCollections,
		viewMode:    viewSplit,
		body:        body,
		response:    viewport.New(),
		url:         urlInput,
		search:      search,
		importPath:  importPath,
		headers:     headers,
		authFields:  authFields,
		authMode:    "token",
		authAlgo:    "HS256",
	}
	m.rebuildVisible("")
	m.loadSelected()
	return m
}

func (m Model) Init() tea.Cmd { return nil }

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch typed := msg.(type) {
	case tea.WindowSizeMsg:
		m.width, m.height = typed.Width, typed.Height
		m.resizeComponents()
		return m, nil
	case responseMsg:
		m.loading = false
		if typed.err != nil {
			m.status, m.statusError = typed.err.Error(), true
			m.response.SetContent(errorStyle.Render("Request failed\n\n") + typed.err.Error())
			return m, nil
		}
		m.last = &typed.response
		m.status = fmt.Sprintf("%s in %s", typed.response.Status, durationString(typed.response.Duration))
		m.statusError = typed.response.StatusCode >= 400
		m.response.SetContent(packet.FormatResponse(typed.response))
		m.response.GotoTop()
		return m, nil
	case importMsg:
		if typed.err != nil {
			m.status, m.statusError = typed.err.Error(), true
			return m, nil
		}
		m.syncCurrent()
		m.collections = append(m.collections, typed.collection)
		m.rebuildVisible("")
		for i, ref := range m.visible {
			if ref.collection == len(m.collections)-1 {
				m.selected = i
				break
			}
		}
		m.loadSelected()
		m.status, m.statusError = "Imported "+typed.path, false
		return m, nil
	}

	key, ok := msg.(tea.KeyPressMsg)
	if !ok {
		return m.updateFocused(msg)
	}
	if key.String() == "ctrl+c" {
		return m, tea.Quit
	}
	if m.modal != modalNone {
		return m.updateModal(msg, key.String())
	}
	if key.String() == "ctrl+s" {
		return m.send()
	}
	if key.String() == "esc" {
		m.setFocus(focusCollections)
		return m, nil
	}

	switch m.focus {
	case focusCollections:
		return m.updateCollections(key.String())
	case focusURL:
		if key.String() == "tab" || key.String() == "down" {
			m.syncCurrent()
			m.setFocus(focusBody)
			return m, nil
		}
	case focusBody:
		if key.String() == "tab" {
			m.syncCurrent()
			m.setFocus(focusResponse)
			return m, nil
		}
	case focusResponse:
		if key.String() == "tab" {
			m.setFocus(focusCollections)
			return m, nil
		}
	}
	return m.updateFocused(msg)
}

func (m Model) updateFocused(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmd tea.Cmd
	switch m.focus {
	case focusURL:
		m.url, cmd = m.url.Update(msg)
		m.syncCurrent()
	case focusBody:
		m.body, cmd = m.body.Update(msg)
		m.syncCurrent()
	case focusResponse:
		m.response, cmd = m.response.Update(msg)
	}
	return m, cmd
}

func (m Model) updateCollections(key string) (tea.Model, tea.Cmd) {
	switch key {
	case "q":
		return m, tea.Quit
	case "j", "down":
		m.moveSelection(1)
	case "k", "up":
		m.moveSelection(-1)
	case "g", "home":
		m.selectIndex(0)
	case "G", "end":
		m.selectIndex(len(m.visible) - 1)
	case "enter":
		return m.send()
	case "tab", "e":
		m.setFocus(focusURL)
	case "b":
		m.setFocus(focusBody)
	case "r":
		m.setFocus(focusResponse)
	case "m":
		m.cycleMethod()
	case "v":
		m.viewMode = (m.viewMode + 1) % 3
		m.resizeComponents()
	case "/":
		m.openSearch()
	case "i":
		m.modal = modalImport
		m.importPath.SetValue("")
		return m, m.importPath.Focus()
	case "H":
		m.openHeaders()
	case "a":
		return m.openAuth()
	case "?":
		m.modal = modalHelp
	}
	return m, nil
}

func (m Model) updateModal(msg tea.Msg, key string) (tea.Model, tea.Cmd) {
	if key == "esc" {
		if m.modal == modalSearch {
			m.rebuildVisible("")
			m.selectIndex(0)
		}
		m.closeModal()
		return m, nil
	}
	switch m.modal {
	case modalHelp:
		m.closeModal()
		return m, nil
	case modalSearch:
		if key == "enter" {
			m.closeModal()
			return m, nil
		}
		var cmd tea.Cmd
		m.search, cmd = m.search.Update(msg)
		m.rebuildVisible(m.search.Value())
		m.selectIndex(0)
		return m, cmd
	case modalImport:
		if key == "enter" {
			path := strings.TrimSpace(m.importPath.Value())
			m.closeModal()
			if path == "" {
				return m, nil
			}
			m.status, m.statusError = "Importing "+path+"...", false
			return m, importCollection(path)
		}
		var cmd tea.Cmd
		m.importPath, cmd = m.importPath.Update(msg)
		return m, cmd
	case modalHeaders:
		if key == "ctrl+s" {
			request := m.currentRequestPointer()
			if request != nil {
				request.Headers = parseHeaders(m.headers.Value())
			}
			m.status, m.statusError = "Headers updated", false
			m.closeModal()
			return m, nil
		}
		var cmd tea.Cmd
		m.headers, cmd = m.headers.Update(msg)
		return m, cmd
	case modalAuth:
		return m.updateAuth(msg, key)
	}
	return m, nil
}

func (m Model) updateAuth(msg tea.Msg, key string) (tea.Model, tea.Cmd) {
	if key == "ctrl+t" {
		if m.authMode == "token" {
			m.authMode, m.authField = "sign", 1
		} else {
			m.authMode, m.authField = "token", 0
		}
		return m.focusAuthField()
	}
	if key == "ctrl+a" && m.authMode == "sign" {
		algorithms := []string{"HS256", "HS384", "HS512"}
		for i, algorithm := range algorithms {
			if algorithm == m.authAlgo {
				m.authAlgo = algorithms[(i+1)%len(algorithms)]
				break
			}
		}
		return m, nil
	}
	if key == "tab" || key == "shift+tab" {
		step := 1
		if key == "shift+tab" {
			step = -1
		}
		if m.authMode == "token" {
			m.authField = 0
		} else {
			m.authField = 1 + (m.authField-1+step+2)%2
		}
		return m.focusAuthField()
	}
	if key == "enter" {
		request := m.currentRequestPointer()
		if request != nil {
			request.Auth = &packet.JWTAuth{
				Mode: m.authMode, Token: m.authFields[0].Value(), Secret: m.authFields[1].Value(),
				Algorithm: m.authAlgo, Claims: m.authFields[2].Value(),
			}
			if _, err := request.Auth.BearerToken(); err != nil {
				m.status, m.statusError = err.Error(), true
				return m, nil
			}
		}
		m.status, m.statusError = "JWT auth updated", false
		m.closeModal()
		return m, nil
	}
	var cmd tea.Cmd
	m.authFields[m.authField], cmd = m.authFields[m.authField].Update(msg)
	return m, cmd
}

func (m Model) send() (tea.Model, tea.Cmd) {
	if m.loading {
		return m, nil
	}
	m.syncCurrent()
	request := m.currentRequestPointer()
	if request == nil {
		return m, nil
	}
	if strings.TrimSpace(request.URL) == "" {
		m.status, m.statusError = "URL is empty", true
		return m, nil
	}
	copy := *request
	m.loading = true
	m.status, m.statusError = "Sending "+copy.Method+"...", false
	m.response.SetContent(dimStyle.Render("Waiting for response..."))
	return m, func() tea.Msg {
		response, err := m.client.Do(copy)
		return responseMsg{response: response, err: err}
	}
}

func importCollection(path string) tea.Cmd {
	return func() tea.Msg {
		collection, err := packet.ImportPostmanFile(os.ExpandEnv(path))
		return importMsg{collection: collection, path: path, err: err}
	}
}

func (m *Model) rebuildVisible(query string) {
	query = strings.ToLower(strings.TrimSpace(query))
	m.visible = m.visible[:0]
	for collectionIndex, collection := range m.collections {
		for requestIndex, request := range collection.Requests {
			haystack := strings.ToLower(collection.Name + " " + request.Name + " " + request.Method + " " + request.URL)
			if query == "" || strings.Contains(haystack, query) {
				m.visible = append(m.visible, requestRef{collection: collectionIndex, request: requestIndex})
			}
		}
	}
	if m.selected >= len(m.visible) {
		m.selected = max(0, len(m.visible)-1)
	}
}

func (m *Model) moveSelection(delta int) {
	if len(m.visible) == 0 {
		return
	}
	m.syncCurrent()
	m.selectIndex((m.selected + delta + len(m.visible)) % len(m.visible))
	m.loadSelected()
}

func (m *Model) selectIndex(index int) {
	if len(m.visible) == 0 {
		m.selected = 0
		return
	}
	m.selected = max(0, min(index, len(m.visible)-1))
	m.loadSelected()
}

func (m *Model) currentRequestPointer() *packet.Request {
	if m.selected < 0 || m.selected >= len(m.visible) {
		return nil
	}
	ref := m.visible[m.selected]
	return &m.collections[ref.collection].Requests[ref.request]
}

func (m *Model) syncCurrent() {
	request := m.currentRequestPointer()
	if request != nil {
		request.URL = m.url.Value()
		request.Body = m.body.Value()
		if request.BodyMode == "formdata" {
			request.FormData = parseFormData(request.Body)
		}
		if request.BodyMode == "file" {
			request.BodyFile = strings.TrimPrefix(strings.TrimSpace(request.Body), "@")
		}
	}
}

func (m *Model) loadSelected() {
	request := m.currentRequestPointer()
	if request == nil {
		m.url.SetValue("")
		m.body.SetValue("")
		return
	}
	m.url.SetValue(request.URL)
	m.body.SetValue(request.Body)
	m.body.CursorStart()
	m.response.SetContent(dimStyle.Render("Press Ctrl+S or Enter to send this request."))
	m.response.GotoTop()
	m.last = nil
}

func (m *Model) setFocus(next focus) {
	m.url.Blur()
	m.body.Blur()
	m.focus = next
	switch next {
	case focusURL:
		m.url.Focus()
	case focusBody:
		m.body.Focus()
	}
}

func (m *Model) cycleMethod() {
	request := m.currentRequestPointer()
	if request == nil {
		return
	}
	methods := []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"}
	for index, method := range methods {
		if request.Method == method {
			request.Method = methods[(index+1)%len(methods)]
			return
		}
	}
	request.Method = "GET"
}

func (m *Model) openSearch() {
	m.syncCurrent()
	m.modal = modalSearch
	m.search.SetValue("")
	m.search.Focus()
}

func (m *Model) openHeaders() {
	request := m.currentRequestPointer()
	if request == nil {
		return
	}
	var lines []string
	for _, header := range request.Headers {
		lines = append(lines, header.Name+": "+header.Value)
	}
	m.headers.SetValue(strings.Join(lines, "\n"))
	m.modal = modalHeaders
	m.headers.Focus()
}

func (m Model) openAuth() (tea.Model, tea.Cmd) {
	request := m.currentRequestPointer()
	if request == nil {
		return m, nil
	}
	auth := request.Auth
	if auth == nil {
		auth = &packet.JWTAuth{Mode: "token", Algorithm: "HS256", Claims: "{}"}
	}
	m.authMode, m.authAlgo = auth.Mode, auth.Algorithm
	if m.authMode != "sign" {
		m.authMode = "token"
	}
	if m.authAlgo == "" {
		m.authAlgo = "HS256"
	}
	m.authFields[0].SetValue(auth.Token)
	m.authFields[1].SetValue(auth.Secret)
	m.authFields[2].SetValue(auth.Claims)
	m.authField = 0
	if m.authMode == "sign" {
		m.authField = 1
	}
	m.modal = modalAuth
	return m.focusAuthField()
}

func (m Model) focusAuthField() (tea.Model, tea.Cmd) {
	for i := range m.authFields {
		m.authFields[i].Blur()
	}
	cmd := m.authFields[m.authField].Focus()
	return m, cmd
}

func (m *Model) closeModal() {
	m.modal = modalNone
	m.search.Blur()
	m.importPath.Blur()
	m.headers.Blur()
	for i := range m.authFields {
		m.authFields[i].Blur()
	}
	m.setFocus(focusCollections)
}

func parseHeaders(value string) []packet.Header {
	var headers []packet.Header
	for _, line := range strings.Split(value, "\n") {
		name, value, found := strings.Cut(line, ":")
		if found && strings.TrimSpace(name) != "" {
			headers = append(headers, packet.Header{Name: strings.TrimSpace(name), Value: strings.TrimSpace(value)})
		}
	}
	return headers
}

func parseFormData(value string) []packet.FormField {
	var fields []packet.FormField
	for _, line := range strings.Split(value, "\n") {
		name, value, found := strings.Cut(line, "=")
		if !found || strings.TrimSpace(name) == "" {
			continue
		}
		field := packet.FormField{Name: strings.TrimSpace(name), Value: value}
		if strings.HasPrefix(value, "@") {
			field.File, field.Value = strings.TrimPrefix(value, "@"), ""
		}
		fields = append(fields, field)
	}
	return fields
}

func (m *Model) resizeComponents() {
	contentWidth, contentHeight := m.contentDimensions()
	requestHeight := contentHeight - 2
	if m.viewMode == viewSplit {
		requestHeight = max(3, (contentHeight-2)/2)
	}
	m.url.SetWidth(max(10, contentWidth-13))
	m.body.SetWidth(max(10, contentWidth-4))
	m.body.SetHeight(max(1, requestHeight-3))
	responseHeight := contentHeight - 2
	if m.viewMode == viewSplit {
		responseHeight = max(3, contentHeight-requestHeight-2)
	}
	m.response.SetWidth(max(10, contentWidth-4))
	m.response.SetHeight(max(1, responseHeight-3))
	m.search.SetWidth(max(20, min(70, m.width-12)))
	m.importPath.SetWidth(max(20, min(70, m.width-18)))
	m.headers.SetWidth(max(20, min(76, m.width-10)))
	m.headers.SetHeight(max(5, min(18, m.height-10)))
	for i := range m.authFields {
		m.authFields[i].SetWidth(max(20, min(64, m.width-22)))
	}
}

func (m Model) contentDimensions() (int, int) {
	workspaceHeight := max(8, m.height-4)
	if m.width < 80 {
		return max(30, m.width-2), max(8, workspaceHeight-workspaceHeight/3)
	}
	leftWidth := min(38, max(24, m.width/4))
	return max(30, m.width-leftWidth-1), workspaceHeight
}

func (m Model) View() tea.View {
	if m.width == 0 {
		view := tea.NewView("Starting packet...")
		view.AltScreen = true
		return view
	}

	var content string
	if m.modal != modalNone {
		content = m.renderModal()
	} else {
		workspaceHeight := max(8, m.height-4)
		if m.width < 80 {
			listHeight := max(4, workspaceHeight/3)
			content = lipgloss.JoinVertical(lipgloss.Left, m.renderCollections(m.width-2, listHeight), m.renderContent(m.width-2, workspaceHeight-listHeight))
		} else {
			leftWidth := min(38, max(24, m.width/4))
			content = lipgloss.JoinHorizontal(lipgloss.Top, m.renderCollections(leftWidth, workspaceHeight), m.renderContent(m.width-leftWidth-1, workspaceHeight))
		}
	}

	screen := lipgloss.JoinVertical(lipgloss.Left, m.renderHeader(), content, m.renderFooter())
	view := tea.NewView(screen)
	view.AltScreen = true
	view.WindowTitle = "packet"
	return view
}

func (m Model) renderHeader() string {
	title := brandStyle.Render(" packet") + dimStyle.Render("  HTTP WORKBENCH")
	right := dimStyle.Render("? help  |  ctrl+s send  |  ctrl+c quit")
	space := max(1, m.width-lipgloss.Width(title)-lipgloss.Width(right))
	return title + strings.Repeat(" ", space) + right + "\n" + dimStyle.Render(strings.Repeat("-", max(1, m.width)))
}

func (m Model) renderCollections(width, height int) string {
	title := " COLLECTIONS"
	if m.focus == focusCollections {
		title = activeStyle.Render(title)
	} else {
		title = dimStyle.Render(title)
	}
	rows := max(1, height-3)
	var allLines []string
	selectedRow := 0
	lastCollection := -1
	for i, ref := range m.visible {
		collection := m.collections[ref.collection]
		request := collection.Requests[ref.request]
		if ref.collection != lastCollection {
			allLines = append(allLines, dimStyle.Render("  "+truncate(collection.Name, width-5)))
			lastCollection = ref.collection
		}
		method := methodStyle.Render(fmt.Sprintf("%-6s", request.Method))
		line := "  " + method + " " + truncate(request.Name, width-12)
		if i == m.selected {
			selectedRow = len(allLines)
			line = selectedLine.Width(max(1, width-2)).Render("> " + fmt.Sprintf("%-6s", request.Method) + " " + truncate(request.Name, width-12))
		}
		allLines = append(allLines, line)
	}
	if len(m.visible) == 0 {
		allLines = append(allLines, dimStyle.Render("  No matching requests"))
	}
	offset := max(0, min(selectedRow-rows+1, max(0, len(allLines)-rows)))
	end := min(len(allLines), offset+rows)
	lines := allLines[offset:end]
	for len(lines) < rows {
		lines = append(lines, "")
	}
	count := dimStyle.Render(fmt.Sprintf(" %d requests", len(m.visible)))
	return panelStyle.Width(max(1, width-2)).Height(max(1, height-2)).Render(title + "\n" + strings.Join(lines, "\n") + "\n" + count)
}

func (m Model) renderContent(width, height int) string {
	request := m.currentRequestPointer()
	method := "---"
	if request != nil {
		method = request.Method
	}
	urlLine := methodStyle.Width(8).Render(method) + " " + m.url.View()
	viewTabs := []string{"split", "request", "response"}
	for i := range viewTabs {
		if viewMode(i) == m.viewMode {
			viewTabs[i] = activeStyle.Render("[" + viewTabs[i] + "]")
		} else {
			viewTabs[i] = dimStyle.Render(viewTabs[i])
		}
	}
	top := urlLine + "\n" + strings.Join(viewTabs, "  ")
	available := max(4, height-2)
	var panels string
	switch m.viewMode {
	case viewRequest:
		panels = m.renderBody(width, available)
	case viewResponse:
		panels = m.renderResponse(width, available)
	default:
		requestHeight := max(3, available/2)
		panels = lipgloss.JoinVertical(lipgloss.Left, m.renderBody(width, requestHeight), m.renderResponse(width, available-requestHeight))
	}
	return top + "\n" + panels
}

func (m Model) renderBody(width, height int) string {
	title := " REQUEST BODY"
	if m.focus == focusBody {
		title = activeStyle.Render(title)
	} else {
		title = dimStyle.Render(title)
	}
	return panelStyle.Width(max(1, width-2)).Height(max(1, height-2)).Render(title + "\n" + m.body.View())
}

func (m Model) renderResponse(width, height int) string {
	title := " RESPONSE"
	if m.focus == focusResponse {
		title = activeStyle.Render(title)
	} else {
		title = dimStyle.Render(title)
	}
	meta := ""
	if m.loading {
		meta = methodStyle.Render(" sending")
	} else if m.last != nil {
		status := green
		if m.last.StatusCode >= 400 {
			status = red
		}
		meta = lipgloss.NewStyle().Foreground(status).Render(" "+m.last.Status) + dimStyle.Render("  "+durationString(m.last.Duration)+"  "+sizeString(m.last.Size))
	}
	return panelStyle.Width(max(1, width-2)).Height(max(1, height-2)).Render(title + meta + "\n" + m.response.View())
}

func (m Model) renderFooter() string {
	status := m.status
	if status == "" {
		status = "j/k navigate | enter send | e URL | b body | H headers | a JWT | / search | i import | v view"
	}
	style := dimStyle
	if m.statusError {
		style = errorStyle
	}
	return style.Width(max(1, m.width)).Render(truncate(status, m.width))
}

func (m Model) renderModal() string {
	width := max(30, min(82, m.width-4))
	var title, body, hint string
	switch m.modal {
	case modalSearch:
		title, body, hint = "QUICK SEARCH", m.search.View(), "Enter keep results | Esc clear"
	case modalImport:
		title, body, hint = "IMPORT POSTMAN", m.importPath.View(), "Postman Collection v2.0/v2.1 JSON | Enter import | Esc cancel"
	case modalHeaders:
		title, body, hint = "REQUEST HEADERS", m.headers.View(), "One Name: value per line | Ctrl+S save | Esc cancel"
	case modalAuth:
		title, body, hint = "JWT AUTH", m.renderAuth(), "Ctrl+T token/sign | Ctrl+A algorithm | Tab field | Enter save | Esc cancel"
	case modalHelp:
		title, body, hint = "KEYBOARD MAP", helpText(), "Press any key to close"
	}
	box := panelStyle.BorderForeground(accent).Width(width - 2).Render(activeStyle.Render(" "+title) + "\n\n" + body + "\n\n" + dimStyle.Render(hint))
	return lipgloss.Place(m.width, max(8, m.height-3), lipgloss.Center, lipgloss.Center, box)
}

func (m Model) renderAuth() string {
	modeToken := dimStyle.Render("token")
	modeSign := dimStyle.Render("sign")
	if m.authMode == "token" {
		modeToken = activeStyle.Render("[token]")
		return "Mode  " + modeToken + "  " + modeSign + "\n\nToken   " + m.authFields[0].View()
	}
	modeSign = activeStyle.Render("[sign]")
	return "Mode  " + modeToken + "  " + modeSign + "\n\nSecret  " + m.authFields[1].View() + "\nAlgo    " + methodStyle.Render(m.authAlgo) + "\nClaims  " + m.authFields[2].View()
}

func helpText() string {
	return strings.Join([]string{
		"j/k, arrows     select request / scroll response",
		"Enter, Ctrl+S   send request",
		"e / b / r       focus URL / body / response",
		"Tab / Esc       next panel / collections",
		"m               cycle HTTP method",
		"v               split / request / response view",
		"/               quick search",
		"H               edit request headers",
		"a               configure JWT bearer auth",
		"i               import a Postman collection",
		"q, Ctrl+C       quit",
	}, "\n")
}

func truncate(value string, width int) string {
	if width <= 0 {
		return ""
	}
	runes := []rune(value)
	if len(runes) <= width {
		return value
	}
	if width == 1 {
		return "."
	}
	if width < 4 {
		return string(runes[:width])
	}
	return string(runes[:width-3]) + "..."
}

func durationString(duration time.Duration) string {
	if duration < time.Millisecond {
		return duration.Round(time.Microsecond).String()
	}
	return duration.Round(time.Millisecond).String()
}

func sizeString(size int64) string {
	if size < 0 {
		return "unknown size"
	}
	if size < 1024 {
		return strconv.FormatInt(size, 10) + " B"
	}
	if size < 1024*1024 {
		return fmt.Sprintf("%.1f KiB", float64(size)/1024)
	}
	return fmt.Sprintf("%.1f MiB", float64(size)/(1024*1024))
}
