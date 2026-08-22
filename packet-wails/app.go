package main

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"strings"
	"sync"
	"time"
)

type App struct {
	ctx    context.Context
	mu     sync.Mutex
	jar    http.CookieJar
	client *http.Client
}

type KeyValue struct {
	Key     string `json:"key"`
	Value   string `json:"value"`
	Enabled bool   `json:"enabled"`
}

type RequestInput struct {
	Method  string     `json:"method"`
	URL     string     `json:"url"`
	Headers []KeyValue `json:"headers"`
	Params  []KeyValue `json:"params"`
	Body    string     `json:"body"`
}

type ResponseOutput struct {
	Status         int        `json:"status"`
	StatusText     string     `json:"statusText"`
	DurationMs     int64      `json:"durationMs"`
	SizeBytes      int        `json:"sizeBytes"`
	Body           string     `json:"body"`
	Headers        []KeyValue `json:"headers"`
	RequestHeaders []KeyValue `json:"requestHeaders"`
	CookieCount    int        `json:"cookieCount"`
}

type JWTInput struct {
	Algorithm string `json:"algorithm"`
	Secret    string `json:"secret"`
	Payload   string `json:"payload"`
}

type ImportedRequest struct {
	ID      string     `json:"id"`
	Name    string     `json:"name"`
	Folder  string     `json:"folder"`
	Method  string     `json:"method"`
	URL     string     `json:"url"`
	Headers []KeyValue `json:"headers"`
	Params  []KeyValue `json:"params"`
	Body    string     `json:"body"`
}

type ImportedCollection struct {
	Name      string            `json:"name"`
	Requests  []ImportedRequest `json:"requests"`
	Variables []KeyValue        `json:"variables"`
}

func NewApp() *App {
	app := &App{ctx: context.Background()}
	app.resetClient()
	return app
}

func (a *App) startup(ctx context.Context) { a.ctx = ctx }

func (a *App) resetClient() {
	jar, _ := cookiejar.New(nil)
	a.jar = jar
	a.client = &http.Client{Jar: jar, Timeout: 60 * time.Second}
}

func (a *App) ClearCookies() int {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.resetClient()
	return 0
}

func (a *App) SendRequest(input RequestInput) (ResponseOutput, error) {
	method := strings.ToUpper(strings.TrimSpace(input.Method))
	if method == "" {
		method = http.MethodGet
	}
	parsed, err := url.Parse(strings.TrimSpace(input.URL))
	if err != nil || parsed.Scheme == "" || parsed.Host == "" {
		return ResponseOutput{}, errors.New("enter a valid URL including http:// or https://")
	}

	query := parsed.Query()
	for _, pair := range input.Params {
		if pair.Enabled && strings.TrimSpace(pair.Key) != "" {
			query.Add(pair.Key, pair.Value)
		}
	}
	parsed.RawQuery = query.Encode()

	var body io.Reader
	if input.Body != "" && method != http.MethodGet && method != http.MethodHead {
		body = bytes.NewBufferString(input.Body)
	}
	req, err := http.NewRequestWithContext(a.ctx, method, parsed.String(), body)
	if err != nil {
		return ResponseOutput{}, err
	}
	for _, header := range input.Headers {
		if header.Enabled && strings.TrimSpace(header.Key) != "" {
			req.Header.Add(header.Key, header.Value)
		}
	}
	if input.Body != "" && req.Header.Get("Content-Type") == "" {
		req.Header.Set("Content-Type", "application/json")
	}

	// Materialise jar cookies into a display-only header copy. http.Client will
	// attach the actual jar cookies, so this avoids sending duplicates.
	effectiveHeaders := req.Header.Clone()
	a.mu.Lock()
	for _, cookie := range a.jar.Cookies(parsed) {
		if current := effectiveHeaders.Get("Cookie"); current == "" {
			effectiveHeaders.Set("Cookie", cookie.String())
		} else {
			effectiveHeaders.Set("Cookie", current+"; "+cookie.String())
		}
	}
	client := a.client
	a.mu.Unlock()

	started := time.Now()
	resp, err := client.Do(req)
	duration := time.Since(started).Milliseconds()
	if err != nil {
		return ResponseOutput{}, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(io.LimitReader(resp.Body, 20*1024*1024))
	if err != nil {
		return ResponseOutput{}, err
	}

	a.mu.Lock()
	cookieCount := len(a.jar.Cookies(resp.Request.URL))
	a.mu.Unlock()
	return ResponseOutput{
		Status:         resp.StatusCode,
		StatusText:     resp.Status,
		DurationMs:     duration,
		SizeBytes:      len(data),
		Body:           string(data),
		Headers:        headerPairs(resp.Header),
		RequestHeaders: headerPairs(effectiveHeaders),
		CookieCount:    cookieCount,
	}, nil
}

func headerPairs(headers http.Header) []KeyValue {
	pairs := make([]KeyValue, 0, len(headers))
	for key, values := range headers {
		pairs = append(pairs, KeyValue{Key: key, Value: strings.Join(values, ", "), Enabled: true})
	}
	return pairs
}

func (a *App) GenerateJWT(input JWTInput) (string, error) {
	algorithm := strings.ToUpper(strings.TrimSpace(input.Algorithm))
	if algorithm != "HS256" && algorithm != "HS384" && algorithm != "HS512" {
		return "", errors.New("supported JWT algorithms are HS256, HS384, and HS512")
	}
	if input.Secret == "" {
		return "", errors.New("a signing secret is required")
	}
	var payload map[string]interface{}
	if err := json.Unmarshal([]byte(input.Payload), &payload); err != nil {
		return "", fmt.Errorf("invalid payload JSON: %w", err)
	}
	headerJSON, _ := json.Marshal(map[string]string{"alg": algorithm, "typ": "JWT"})
	payloadJSON, _ := json.Marshal(payload)
	encode := base64.RawURLEncoding.EncodeToString
	unsigned := encode(headerJSON) + "." + encode(payloadJSON)

	var signature []byte
	switch algorithm {
	case "HS256":
		mac := hmac.New(sha256.New, []byte(input.Secret))
		mac.Write([]byte(unsigned))
		signature = mac.Sum(nil)
	case "HS384":
		mac := hmac.New(sha512.New384, []byte(input.Secret))
		mac.Write([]byte(unsigned))
		signature = mac.Sum(nil)
	case "HS512":
		mac := hmac.New(sha512.New, []byte(input.Secret))
		mac.Write([]byte(unsigned))
		signature = mac.Sum(nil)
	}
	return unsigned + "." + encode(signature), nil
}

func (a *App) ImportPostman(raw string) (ImportedCollection, error) {
	var collection postmanCollection
	if err := json.Unmarshal([]byte(raw), &collection); err != nil {
		return ImportedCollection{}, fmt.Errorf("invalid Postman collection: %w", err)
	}
	if len(collection.Item) == 0 {
		return ImportedCollection{}, errors.New("the collection does not contain any requests")
	}
	result := ImportedCollection{Name: collection.Info.Name}
	result.Variables = []KeyValue{}
	if strings.TrimSpace(result.Name) == "" {
		result.Name = "Imported collection"
	}
	flattenPostmanItems(collection.Item, "", &result.Requests)
	for _, variable := range collection.Variable {
		result.Variables = append(result.Variables, KeyValue{Key: variable.Key, Value: variable.Value, Enabled: !variable.Disabled})
	}
	return result, nil
}

type postmanCollection struct {
	Info struct {
		Name string `json:"name"`
	} `json:"info"`
	Item     []postmanItem `json:"item"`
	Variable []postmanKV   `json:"variable"`
}

type postmanItem struct {
	Name    string          `json:"name"`
	Item    []postmanItem   `json:"item"`
	Request *postmanRequest `json:"request"`
}

type postmanRequest struct {
	Method string          `json:"method"`
	Header []postmanKV     `json:"header"`
	URL    json.RawMessage `json:"url"`
	Body   struct {
		Mode       string      `json:"mode"`
		Raw        string      `json:"raw"`
		URLEncoded []postmanKV `json:"urlencoded"`
	} `json:"body"`
}

type postmanKV struct {
	Key      string `json:"key"`
	Value    string `json:"value"`
	Disabled bool   `json:"disabled"`
}

func flattenPostmanItems(items []postmanItem, folder string, out *[]ImportedRequest) {
	for index, item := range items {
		if len(item.Item) > 0 {
			next := item.Name
			if folder != "" {
				next = folder + " / " + item.Name
			}
			flattenPostmanItems(item.Item, next, out)
			continue
		}
		if item.Request == nil {
			continue
		}
		req := ImportedRequest{
			ID:      fmt.Sprintf("import-%d-%d", time.Now().UnixNano(), index),
			Name:    item.Name,
			Folder:  folder,
			Method:  strings.ToUpper(item.Request.Method),
			Headers: []KeyValue{},
			Params:  []KeyValue{},
		}
		for _, header := range item.Request.Header {
			req.Headers = append(req.Headers, KeyValue{Key: header.Key, Value: header.Value, Enabled: !header.Disabled})
		}
		req.URL, req.Params = parsePostmanURL(item.Request.URL)
		if req.Params == nil {
			req.Params = []KeyValue{}
		}
		if item.Request.Body.Mode == "raw" {
			req.Body = item.Request.Body.Raw
		} else if item.Request.Body.Mode == "urlencoded" {
			values := url.Values{}
			for _, pair := range item.Request.Body.URLEncoded {
				if !pair.Disabled {
					values.Add(pair.Key, pair.Value)
				}
			}
			req.Body = values.Encode()
		}
		*out = append(*out, req)
	}
}

func parsePostmanURL(raw json.RawMessage) (string, []KeyValue) {
	var direct string
	if json.Unmarshal(raw, &direct) == nil {
		return direct, nil
	}
	var object struct {
		Raw   string      `json:"raw"`
		Query []postmanKV `json:"query"`
	}
	if json.Unmarshal(raw, &object) != nil {
		return "", nil
	}
	params := make([]KeyValue, 0, len(object.Query))
	for _, query := range object.Query {
		params = append(params, KeyValue{Key: query.Key, Value: query.Value, Enabled: !query.Disabled})
	}
	// Postman raw URLs already contain their query string. Strip it because the
	// query editor owns these values and SendRequest appends enabled parameters.
	if parsed, err := url.Parse(object.Raw); err == nil && len(object.Query) > 0 {
		parsed.RawQuery = ""
		return parsed.String(), params
	}
	return object.Raw, params
}
