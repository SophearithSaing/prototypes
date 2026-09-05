package packet

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestClientSendsRequestAndKeepsCookies(t *testing.T) {
	var calls int
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		calls++
		if calls == 1 {
			if request.Method != http.MethodPost || request.Header.Get("Authorization") != "Bearer token" {
				t.Errorf("first request method/auth = %s/%q", request.Method, request.Header.Get("Authorization"))
			}
			if contentType := request.Header.Get("Content-Type"); contentType != "application/json" {
				t.Errorf("content type = %q", contentType)
			}
			http.SetCookie(writer, &http.Cookie{Name: "session", Value: "abc", Path: "/"})
			writer.Header().Set("Content-Type", "application/json")
			_, _ = io.WriteString(writer, `{"ok":true}`)
			return
		}
		cookie, err := request.Cookie("session")
		if err != nil || cookie.Value != "abc" {
			t.Errorf("cookie = %#v, err = %v", cookie, err)
		}
		writer.WriteHeader(http.StatusNoContent)
	}))
	defer server.Close()

	client := NewClient()
	response, err := client.Do(Request{Method: "POST", URL: server.URL, Body: `{"hello":"world"}`, Auth: &JWTAuth{Mode: "token", Token: "token"}})
	if err != nil {
		t.Fatal(err)
	}
	if response.StatusCode != http.StatusOK || response.Body != "{\n  \"ok\": true\n}" {
		t.Fatalf("response = %#v", response)
	}
	if _, err := client.Do(Request{Method: "GET", URL: server.URL}); err != nil {
		t.Fatal(err)
	}
}

func TestClientEncodesURLAndMultipartForms(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		switch request.URL.Path {
		case "/urlencoded":
			if request.Header.Get("Content-Type") != "application/x-www-form-urlencoded" {
				t.Errorf("content type = %q", request.Header.Get("Content-Type"))
			}
			body, _ := io.ReadAll(request.Body)
			if string(body) != "name=Ada+Lovelace" {
				t.Errorf("body = %q", body)
			}
		case "/multipart":
			if err := request.ParseMultipartForm(1024); err != nil {
				t.Errorf("parse multipart: %v", err)
				return
			}
			if request.FormValue("note") != "hello" {
				t.Errorf("note = %q", request.FormValue("note"))
			}
		}
	}))
	defer server.Close()

	client := NewClient()
	if _, err := client.Do(Request{Method: "POST", URL: server.URL + "/urlencoded", BodyMode: "urlencoded", Body: "name=Ada+Lovelace"}); err != nil {
		t.Fatal(err)
	}
	if _, err := client.Do(Request{Method: "POST", URL: server.URL + "/multipart", BodyMode: "formdata", FormData: []FormField{{Name: "note", Value: "hello"}}}); err != nil {
		t.Fatal(err)
	}
}

func TestFormatResponseIncludesHeadersAndTruncation(t *testing.T) {
	formatted := FormatResponse(Response{Headers: []Header{{Name: "X-Test", Value: "yes"}}, Body: "body", Truncated: true})
	if !strings.Contains(formatted, "X-Test: yes\n\nbody") || !strings.Contains(formatted, "response truncated") {
		t.Fatalf("formatted response = %q", formatted)
	}
}
