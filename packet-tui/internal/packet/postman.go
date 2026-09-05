package packet

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strings"
)

type postmanCollection struct {
	Info struct {
		Name   string `json:"name"`
		Schema string `json:"schema"`
	} `json:"info"`
	Items     []postmanItem `json:"item"`
	Variables []postmanKV   `json:"variable"`
	Auth      *postmanAuth  `json:"auth"`
}

type postmanItem struct {
	Name    string          `json:"name"`
	Items   []postmanItem   `json:"item"`
	Request json.RawMessage `json:"request"`
	Auth    *postmanAuth    `json:"auth"`
}

type postmanRequest struct {
	Method  string          `json:"method"`
	Headers []postmanKV     `json:"header"`
	Body    postmanBody     `json:"body"`
	URL     json.RawMessage `json:"url"`
	Auth    *postmanAuth    `json:"auth"`
}

type postmanBody struct {
	Mode       string      `json:"mode"`
	Raw        string      `json:"raw"`
	URLEncoded []postmanKV `json:"urlencoded"`
	FormData   []postmanKV `json:"formdata"`
	File       struct {
		Src string `json:"src"`
	} `json:"file"`
	GraphQL struct {
		Query     string `json:"query"`
		Variables string `json:"variables"`
	} `json:"graphql"`
}

type postmanKV struct {
	Key      string `json:"key"`
	Value    any    `json:"value"`
	Type     string `json:"type"`
	Src      any    `json:"src"`
	Disabled bool   `json:"disabled"`
}

type postmanAuth struct {
	Type   string      `json:"type"`
	Bearer []postmanKV `json:"bearer"`
}

type postmanURL struct {
	Raw      string      `json:"raw"`
	Protocol string      `json:"protocol"`
	Host     any         `json:"host"`
	Path     any         `json:"path"`
	Query    []postmanKV `json:"query"`
}

func ImportPostmanFile(path string) (Collection, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Collection{}, err
	}
	collection, err := ImportPostman(data)
	if err != nil {
		return Collection{}, fmt.Errorf("%s: %w", path, err)
	}
	base := filepath.Dir(path)
	for i := range collection.Requests {
		request := &collection.Requests[i]
		if request.BodyFile != "" && !filepath.IsAbs(request.BodyFile) {
			request.BodyFile = filepath.Join(base, request.BodyFile)
			request.Body = "@" + request.BodyFile
		}
		for j := range request.FormData {
			if request.FormData[j].File != "" && !filepath.IsAbs(request.FormData[j].File) {
				request.FormData[j].File = filepath.Join(base, request.FormData[j].File)
			}
		}
		if request.BodyMode == "formdata" {
			request.Body = formDataSummary(request.FormData)
		}
	}
	return collection, nil
}

func ImportPostman(data []byte) (Collection, error) {
	var source postmanCollection
	if err := json.Unmarshal(data, &source); err != nil {
		return Collection{}, fmt.Errorf("invalid Postman collection: %w", err)
	}
	if source.Info.Name == "" || source.Items == nil {
		return Collection{}, errors.New("missing Postman collection info or items")
	}
	variables := make(map[string]string, len(source.Variables))
	for _, variable := range source.Variables {
		if !variable.Disabled {
			variables[variable.Key] = valueString(variable.Value)
		}
	}
	collection := Collection{Name: source.Info.Name}
	walkPostmanItems(source.Items, "", source.Auth, variables, &collection.Requests)
	if len(collection.Requests) == 0 {
		return Collection{}, errors.New("Postman collection contains no requests")
	}
	return collection, nil
}

func walkPostmanItems(items []postmanItem, prefix string, inheritedAuth *postmanAuth, variables map[string]string, output *[]Request) {
	for _, item := range items {
		name := item.Name
		if prefix != "" {
			name = prefix + " / " + item.Name
		}
		auth := inheritedAuth
		if item.Auth != nil {
			auth = item.Auth
		}
		if len(item.Items) > 0 {
			walkPostmanItems(item.Items, name, auth, variables, output)
			continue
		}
		request, err := decodePostmanRequest(item.Request, name, auth, variables)
		if err == nil {
			*output = append(*output, request)
		}
	}
}

func decodePostmanRequest(data json.RawMessage, name string, inheritedAuth *postmanAuth, variables map[string]string) (Request, error) {
	if len(data) == 0 || string(data) == "null" {
		return Request{}, errors.New("missing request")
	}
	if data[0] == '"' {
		var address string
		if err := json.Unmarshal(data, &address); err != nil {
			return Request{}, err
		}
		return Request{Name: name, Method: "GET", URL: resolveVariables(address, variables)}, nil
	}

	var source postmanRequest
	if err := json.Unmarshal(data, &source); err != nil {
		return Request{}, err
	}
	request := Request{Name: name, Method: strings.ToUpper(source.Method)}
	if request.Method == "" {
		request.Method = "GET"
	}
	request.URL = resolveVariables(decodePostmanURL(source.URL, variables), variables)
	for _, header := range source.Headers {
		if !header.Disabled && header.Key != "" {
			request.Headers = append(request.Headers, Header{Name: header.Key, Value: resolveVariables(valueString(header.Value), variables)})
		}
	}
	request.BodyMode, request.Body, request.FormData, request.BodyFile = decodePostmanBody(source.Body, variables)
	auth := source.Auth
	if auth == nil {
		auth = inheritedAuth
	}
	request.Auth = decodePostmanAuth(auth, variables)
	return request, nil
}

func decodePostmanURL(data json.RawMessage, variables map[string]string) string {
	if len(data) == 0 || string(data) == "null" {
		return ""
	}
	if data[0] == '"' {
		var raw string
		_ = json.Unmarshal(data, &raw)
		return raw
	}
	var parsed postmanURL
	if json.Unmarshal(data, &parsed) != nil {
		return ""
	}
	if parsed.Raw != "" {
		return parsed.Raw
	}
	host := strings.Join(stringSlice(parsed.Host, "."), ".")
	path := strings.Join(stringSlice(parsed.Path, "/"), "/")
	address := host
	if parsed.Protocol != "" {
		address = parsed.Protocol + "://" + host
	}
	if path != "" {
		address += "/" + path
	}
	values := url.Values{}
	for _, query := range parsed.Query {
		if !query.Disabled {
			values.Add(query.Key, resolveVariables(valueString(query.Value), variables))
		}
	}
	if encoded := values.Encode(); encoded != "" {
		address += "?" + encoded
	}
	return address
}

func decodePostmanBody(body postmanBody, variables map[string]string) (string, string, []FormField, string) {
	switch body.Mode {
	case "raw":
		return "raw", resolveVariables(body.Raw, variables), nil, ""
	case "urlencoded":
		values := url.Values{}
		for _, field := range body.URLEncoded {
			if !field.Disabled {
				values.Add(field.Key, resolveVariables(valueString(field.Value), variables))
			}
		}
		return "urlencoded", values.Encode(), nil, ""
	case "formdata":
		var fields []FormField
		var summary []string
		for _, field := range body.FormData {
			if field.Disabled {
				continue
			}
			entry := FormField{Name: field.Key, Value: resolveVariables(valueString(field.Value), variables)}
			if field.Type == "file" {
				entry.File = resolveVariables(firstString(field.Src), variables)
				summary = append(summary, field.Key+"=@"+entry.File)
			} else {
				summary = append(summary, field.Key+"="+entry.Value)
			}
			fields = append(fields, entry)
		}
		return "formdata", strings.Join(summary, "\n"), fields, ""
	case "graphql":
		variablesValue := any(map[string]any{})
		if strings.TrimSpace(body.GraphQL.Variables) != "" {
			if json.Unmarshal([]byte(body.GraphQL.Variables), &variablesValue) != nil {
				variablesValue = body.GraphQL.Variables
			}
		}
		payload, _ := json.Marshal(map[string]any{"query": body.GraphQL.Query, "variables": variablesValue})
		return "graphql", resolveVariables(string(payload), variables), nil, ""
	case "file":
		path := resolveVariables(body.File.Src, variables)
		return "file", "@" + path, nil, path
	default:
		return body.Mode, "", nil, ""
	}
}

func decodePostmanAuth(auth *postmanAuth, variables map[string]string) *JWTAuth {
	if auth == nil || auth.Type != "bearer" {
		return nil
	}
	for _, field := range auth.Bearer {
		if field.Key == "token" && !field.Disabled {
			return &JWTAuth{Mode: "token", Token: resolveVariables(valueString(field.Value), variables), Algorithm: "HS256", Claims: "{}"}
		}
	}
	return nil
}

func resolveVariables(value string, variables map[string]string) string {
	for key, replacement := range variables {
		value = strings.ReplaceAll(value, "{{"+key+"}}", replacement)
	}
	return value
}

func valueString(value any) string {
	if value == nil {
		return ""
	}
	if text, ok := value.(string); ok {
		return text
	}
	data, _ := json.Marshal(value)
	return string(data)
}

func stringSlice(value any, separator string) []string {
	switch typed := value.(type) {
	case string:
		return strings.Split(typed, separator)
	case []any:
		result := make([]string, 0, len(typed))
		for _, part := range typed {
			result = append(result, valueString(part))
		}
		return result
	default:
		return nil
	}
}

func firstString(value any) string {
	if values, ok := value.([]any); ok && len(values) > 0 {
		return valueString(values[0])
	}
	return valueString(value)
}

func formDataSummary(fields []FormField) string {
	lines := make([]string, 0, len(fields))
	for _, field := range fields {
		value := field.Value
		if field.File != "" {
			value = "@" + field.File
		}
		lines = append(lines, field.Name+"="+value)
	}
	return strings.Join(lines, "\n")
}
