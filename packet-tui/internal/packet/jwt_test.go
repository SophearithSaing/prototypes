package packet

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"strings"
	"testing"
)

func TestJWTAuthTokenMode(t *testing.T) {
	auth := JWTAuth{Mode: "token", Token: "  existing.token.value  "}
	token, err := auth.BearerToken()
	if err != nil {
		t.Fatal(err)
	}
	if token != "existing.token.value" {
		t.Fatalf("token = %q", token)
	}
}

func TestJWTAuthSignsHS256(t *testing.T) {
	auth := JWTAuth{Mode: "sign", Secret: "secret", Algorithm: "hs256", Claims: `{"sub":"42"}`}
	token, err := auth.BearerToken()
	if err != nil {
		t.Fatal(err)
	}
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		t.Fatalf("token has %d parts", len(parts))
	}
	if got, err := base64.RawURLEncoding.DecodeString(parts[0]); err != nil || string(got) != `{"alg":"HS256","typ":"JWT"}` {
		t.Fatalf("header = %q, err = %v", got, err)
	}
	mac := hmac.New(sha256.New, []byte("secret"))
	_, _ = mac.Write([]byte(parts[0] + "." + parts[1]))
	if parts[2] != base64.RawURLEncoding.EncodeToString(mac.Sum(nil)) {
		t.Fatal("signature does not match")
	}
}

func TestJWTAuthRejectsInvalidConfiguration(t *testing.T) {
	tests := []JWTAuth{
		{Mode: "token"},
		{Mode: "sign", Algorithm: "RS256", Secret: "secret", Claims: `{}`},
		{Mode: "sign", Algorithm: "HS256", Claims: `{}`},
		{Mode: "sign", Algorithm: "HS256", Secret: "secret", Claims: `{invalid`},
	}
	for _, auth := range tests {
		if _, err := auth.BearerToken(); err == nil {
			t.Fatalf("expected error for %#v", auth)
		}
	}
}
