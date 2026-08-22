package main

import (
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestGenerateJWT(t *testing.T) {
	app := NewApp()
	token, err := app.GenerateJWT(JWTInput{Algorithm: "HS256", Secret: "secret", Payload: `{"sub":"123"}`})
	if err != nil {
		t.Fatal(err)
	}
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		t.Fatalf("expected three JWT sections, got %d", len(parts))
	}
	payload, _ := base64.RawURLEncoding.DecodeString(parts[1])
	var claims map[string]string
	if err := json.Unmarshal(payload, &claims); err != nil || claims["sub"] != "123" {
		t.Fatalf("unexpected claims: %s", payload)
	}
}

func TestImportPostman(t *testing.T) {
	app := NewApp()
	collection, err := app.ImportPostman(`{
		"info":{"name":"Example"},
		"variable":[{"key":"baseUrl","value":"https://api.test"}],
		"item":[{"name":"Users","item":[{"name":"List","request":{"method":"GET","header":[],"url":{"raw":"https://api.test/users?page=1","query":[{"key":"page","value":"1"}]}}}]}]
	}`)
	if err != nil {
		t.Fatal(err)
	}
	if collection.Name != "Example" || len(collection.Requests) != 1 || collection.Requests[0].Folder != "Users" {
		t.Fatalf("unexpected import: %#v", collection)
	}
	if collection.Requests[0].URL != "https://api.test/users" || len(collection.Requests[0].Params) != 1 {
		t.Fatalf("query was not imported correctly: %#v", collection.Requests[0])
	}
	if len(collection.Variables) != 1 || collection.Variables[0].Key != "baseUrl" {
		t.Fatalf("collection variables were not imported: %#v", collection.Variables)
	}
}

func TestImportPostmanUsesEmptyArraysForMissingFields(t *testing.T) {
	app := NewApp()
	collection, err := app.ImportPostman(`{
		"info":{"name":"Minimal"},
		"item":[{"name":"Health","request":{"method":"GET","url":"https://api.test/health"}}]
	}`)
	if err != nil {
		t.Fatal(err)
	}
	request := collection.Requests[0]
	if request.Headers == nil || request.Params == nil {
		t.Fatalf("missing fields must encode as arrays, got headers=%#v params=%#v", request.Headers, request.Params)
	}
}

func TestCookieJarReplaysCookies(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/set" {
			http.SetCookie(w, &http.Cookie{Name: "session", Value: "packet", Path: "/"})
			w.WriteHeader(http.StatusNoContent)
			return
		}
		_, _ = w.Write([]byte(r.Header.Get("Cookie")))
	}))
	defer server.Close()

	app := NewApp()
	first, err := app.SendRequest(RequestInput{Method: "GET", URL: server.URL + "/set"})
	if err != nil {
		t.Fatal(err)
	}
	if first.CookieCount != 1 {
		t.Fatalf("expected one stored cookie, got %d", first.CookieCount)
	}
	second, err := app.SendRequest(RequestInput{Method: "GET", URL: server.URL + "/echo"})
	if err != nil {
		t.Fatal(err)
	}
	if second.Body != "session=packet" {
		t.Fatalf("expected cookie replay, got %q", second.Body)
	}
	for _, header := range second.RequestHeaders {
		if header.Key == "Cookie" && header.Value != "session=packet" {
			t.Fatalf("cookie was duplicated in the inspector: %q", header.Value)
		}
	}
}
