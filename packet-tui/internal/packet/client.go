package packet

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/cookiejar"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

const maxResponseBody = 10 << 20

type Client struct {
	http *http.Client
}

func NewClient() *Client {
	jar, _ := cookiejar.New(nil)
	return &Client{http: &http.Client{Jar: jar, Timeout: 30 * time.Second}}
}

func (c *Client) Do(in Request) (Response, error) {
	started := time.Now()
	bodyReader, contentType, err := requestBody(in)
	if err != nil {
		return Response{}, err
	}
	req, err := http.NewRequest(strings.ToUpper(in.Method), strings.TrimSpace(in.URL), bodyReader)
	if err != nil {
		return Response{}, err
	}
	for _, header := range in.Headers {
		if strings.TrimSpace(header.Name) != "" {
			req.Header.Add(strings.TrimSpace(header.Name), header.Value)
		}
	}
	if contentType != "" && req.Header.Get("Content-Type") == "" {
		req.Header.Set("Content-Type", contentType)
	}
	if in.Auth != nil {
		token, tokenErr := in.Auth.BearerToken()
		if tokenErr != nil {
			return Response{}, tokenErr
		}
		req.Header.Set("Authorization", "Bearer "+token)
	}

	res, err := c.http.Do(req)
	if err != nil {
		return Response{}, err
	}
	defer res.Body.Close()
	body, err := io.ReadAll(io.LimitReader(res.Body, maxResponseBody+1))
	if err != nil {
		return Response{}, err
	}
	truncated := len(body) > maxResponseBody
	if truncated {
		body = body[:maxResponseBody]
	}

	return Response{
		Status:     res.Status,
		StatusCode: res.StatusCode,
		Headers:    sortedHeaders(res.Header),
		Body:       formatBody(body, res.Header.Get("Content-Type")),
		Duration:   time.Since(started),
		Size:       res.ContentLength,
		Truncated:  truncated,
	}, nil
}

func requestBody(in Request) (io.Reader, string, error) {
	switch in.BodyMode {
	case "formdata":
		var body bytes.Buffer
		writer := multipart.NewWriter(&body)
		for _, field := range in.FormData {
			if field.File == "" {
				if err := writer.WriteField(field.Name, field.Value); err != nil {
					return nil, "", err
				}
				continue
			}
			file, err := os.Open(field.File)
			if err != nil {
				return nil, "", fmt.Errorf("open form file %s: %w", field.File, err)
			}
			part, err := writer.CreateFormFile(field.Name, filepath.Base(field.File))
			if err == nil {
				_, err = io.Copy(part, file)
			}
			closeErr := file.Close()
			if err != nil {
				return nil, "", err
			}
			if closeErr != nil {
				return nil, "", closeErr
			}
		}
		if err := writer.Close(); err != nil {
			return nil, "", err
		}
		return &body, writer.FormDataContentType(), nil
	case "file":
		if strings.TrimSpace(in.BodyFile) == "" {
			return nil, "", errors.New("request body file is empty")
		}
		file, err := os.Open(in.BodyFile)
		if err != nil {
			return nil, "", fmt.Errorf("open request body %s: %w", in.BodyFile, err)
		}
		return file, "application/octet-stream", nil
	case "urlencoded":
		return strings.NewReader(in.Body), "application/x-www-form-urlencoded", nil
	case "graphql":
		return strings.NewReader(in.Body), "application/json", nil
	default:
		if in.Body == "" {
			return nil, "", nil
		}
		contentType := "text/plain; charset=utf-8"
		if json.Valid([]byte(in.Body)) {
			contentType = "application/json"
		}
		return strings.NewReader(in.Body), contentType, nil
	}
}

func sortedHeaders(headers http.Header) []Header {
	names := make([]string, 0, len(headers))
	for name := range headers {
		names = append(names, name)
	}
	sort.Strings(names)
	result := make([]Header, 0, len(names))
	for _, name := range names {
		for _, value := range headers.Values(name) {
			result = append(result, Header{Name: name, Value: value})
		}
	}
	return result
}

func formatBody(body []byte, contentType string) string {
	if strings.Contains(strings.ToLower(contentType), "json") || json.Valid(body) {
		var formatted bytes.Buffer
		if json.Indent(&formatted, body, "", "  ") == nil {
			return formatted.String()
		}
	}
	return string(body)
}

func FormatResponse(response Response) string {
	var out strings.Builder
	for _, header := range response.Headers {
		fmt.Fprintf(&out, "%s: %s\n", header.Name, header.Value)
	}
	if len(response.Headers) > 0 {
		out.WriteByte('\n')
	}
	out.WriteString(response.Body)
	if response.Truncated {
		fmt.Fprintf(&out, "\n\n[response truncated at %d MiB]", maxResponseBody>>20)
	}
	return out.String()
}
