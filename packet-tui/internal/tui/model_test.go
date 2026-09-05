package tui

import (
	"fmt"
	"strings"
	"testing"

	tea "charm.land/bubbletea/v2"

	"packet/internal/packet"
)

func TestCollectionNavigationSupportsLongLists(t *testing.T) {
	requests := make([]packet.Request, 100)
	for i := range requests {
		requests[i] = packet.Request{Name: fmt.Sprintf("Request %03d", i), Method: "GET", URL: "https://example.com"}
	}
	model := New([]packet.Collection{{Name: "Large", Requests: requests}}, packet.NewClient())
	updated, _ := model.Update(tea.WindowSizeMsg{Width: 100, Height: 24})
	model = updated.(Model)
	model.selectIndex(99)
	view := model.View().Content
	if !strings.Contains(view, "Request 099") {
		t.Fatal("selected request is not visible after scrolling")
	}
}

func TestSmallTerminalRendersStackedLayout(t *testing.T) {
	model := New(nil, packet.NewClient())
	updated, _ := model.Update(tea.WindowSizeMsg{Width: 52, Height: 20})
	view := updated.(Model).View().Content
	if !strings.Contains(view, "COLLECTIONS") || !strings.Contains(view, "REQUEST BODY") || !strings.Contains(view, "RESPONSE") {
		t.Fatalf("incomplete small layout: %q", view)
	}
}

func TestParsers(t *testing.T) {
	headers := parseHeaders("Accept: application/json\ninvalid\nX-Trace: one:two")
	if len(headers) != 2 || headers[1].Value != "one:two" {
		t.Fatalf("headers = %#v", headers)
	}
	fields := parseFormData("name=Ada\nasset=@/tmp/file.txt\ninvalid")
	if len(fields) != 2 || fields[1].File != "/tmp/file.txt" {
		t.Fatalf("fields = %#v", fields)
	}
}
