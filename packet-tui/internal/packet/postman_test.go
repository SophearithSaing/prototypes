package packet

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestImportPostmanCollection(t *testing.T) {
	source := `{
  "info": {"name": "Demo", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"},
  "variable": [{"key": "base", "value": "https://api.example.com"}, {"key": "term", "value": "Ada Lovelace"}, {"key": "disabled", "value": "no", "disabled": true}],
  "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "collection-token"}]},
  "item": [{
    "name": "Users",
    "item": [{
      "name": "Create",
      "request": {
        "method": "POST",
        "header": [{"key": "X-Project", "value": "packet"}, {"key": "X-Off", "value": "no", "disabled": true}],
        "body": {"mode": "raw", "raw": "{\"url\":\"{{base}}\"}"},
        "url": {"raw": "{{base}}/users"}
      }
    }, {
      "name": "Form",
      "request": {
        "method": "POST",
        "body": {"mode": "urlencoded", "urlencoded": [{"key": "name", "value": "Ada Lovelace"}]},
        "url": {"protocol": "https", "host": ["api", "example", "com"], "path": ["forms"], "query": [{"key": "q", "value": "{{term}}"}]},
        "auth": {"type": "noauth"}
      }
    }]
  }]
}`

	collection, err := ImportPostman([]byte(source))
	if err != nil {
		t.Fatal(err)
	}
	if collection.Name != "Demo" || len(collection.Requests) != 2 {
		t.Fatalf("collection = %#v", collection)
	}
	create := collection.Requests[0]
	if create.Name != "Users / Create" || create.URL != "https://api.example.com/users" {
		t.Fatalf("create request = %#v", create)
	}
	if create.Body != `{"url":"https://api.example.com"}` || len(create.Headers) != 1 {
		t.Fatalf("body/headers not imported: %#v", create)
	}
	if create.Auth == nil || create.Auth.Token != "collection-token" {
		t.Fatalf("inherited auth = %#v", create.Auth)
	}
	form := collection.Requests[1]
	if form.URL != "https://api.example.com/forms?q=Ada+Lovelace" || form.Body != "name=Ada+Lovelace" || form.Auth != nil {
		t.Fatalf("form request = %#v", form)
	}
}

func TestImportPostmanGraphQLAndMultipart(t *testing.T) {
	source := `{
  "info": {"name": "Bodies"},
  "item": [{
    "name": "GraphQL",
    "request": {"method": "POST", "url": "https://example.com/graphql", "body": {
      "mode": "graphql", "graphql": {"query": "query User($id: ID!) { user(id: $id) { name } }", "variables": "{\"id\":\"7\"}"}
    }}
  }, {
    "name": "Upload",
    "request": {"method": "POST", "url": "https://example.com/upload", "body": {
      "mode": "formdata", "formdata": [{"key": "note", "value": "hello", "type": "text"}, {"key": "asset", "type": "file", "src": "/tmp/image.png"}]
    }}
  }]
}`
	collection, err := ImportPostman([]byte(source))
	if err != nil {
		t.Fatal(err)
	}
	var graphql map[string]any
	if err := json.Unmarshal([]byte(collection.Requests[0].Body), &graphql); err != nil {
		t.Fatalf("GraphQL body is invalid: %v", err)
	}
	variables, ok := graphql["variables"].(map[string]any)
	if !ok || variables["id"] != "7" {
		t.Fatalf("GraphQL variables = %#v", graphql["variables"])
	}
	upload := collection.Requests[1]
	if upload.BodyMode != "formdata" || len(upload.FormData) != 2 || !strings.Contains(upload.Body, "asset=@/tmp/image.png") {
		t.Fatalf("multipart body = %#v", upload)
	}
}

func TestImportPostmanRejectsInvalidCollection(t *testing.T) {
	for _, source := range []string{`not json`, `{}`, `{"info":{"name":"Empty"},"item":[]}`} {
		if _, err := ImportPostman([]byte(source)); err == nil {
			t.Fatalf("expected %q to fail", source)
		}
	}
}
