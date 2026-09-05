package packet

import "time"

type Header struct {
	Name  string
	Value string
}

type FormField struct {
	Name  string
	Value string
	File  string
}

type JWTAuth struct {
	Mode      string
	Token     string
	Secret    string
	Algorithm string
	Claims    string
}

type Request struct {
	Name     string
	Method   string
	URL      string
	Headers  []Header
	Body     string
	BodyMode string
	FormData []FormField
	BodyFile string
	Auth     *JWTAuth
}

type Collection struct {
	Name     string
	Requests []Request
}

type Response struct {
	Status     string
	StatusCode int
	Headers    []Header
	Body       string
	Duration   time.Duration
	Size       int64
	Truncated  bool
}
