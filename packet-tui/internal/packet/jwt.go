package packet

import (
	"crypto/hmac"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/base64"
	"encoding/json"
	"errors"
	"hash"
	"strings"
)

func (a JWTAuth) BearerToken() (string, error) {
	if a.Mode == "token" {
		if strings.TrimSpace(a.Token) == "" {
			return "", errors.New("JWT token is empty")
		}
		return strings.TrimSpace(a.Token), nil
	}

	algorithm := strings.ToUpper(strings.TrimSpace(a.Algorithm))
	var newHash func() hash.Hash
	switch algorithm {
	case "HS256":
		newHash = sha256.New
	case "HS384":
		newHash = sha512.New384
	case "HS512":
		newHash = sha512.New
	default:
		return "", errors.New("JWT algorithm must be HS256, HS384, or HS512")
	}
	if a.Secret == "" {
		return "", errors.New("JWT secret is empty")
	}

	claims := strings.TrimSpace(a.Claims)
	if claims == "" {
		claims = "{}"
	}
	var payload any
	if err := json.Unmarshal([]byte(claims), &payload); err != nil {
		return "", errors.New("JWT claims must be valid JSON")
	}
	payloadJSON, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}
	headerJSON, _ := json.Marshal(map[string]string{"alg": algorithm, "typ": "JWT"})
	encode := base64.RawURLEncoding.EncodeToString
	unsigned := encode(headerJSON) + "." + encode(payloadJSON)
	mac := hmac.New(newHash, []byte(a.Secret))
	_, _ = mac.Write([]byte(unsigned))
	return unsigned + "." + encode(mac.Sum(nil)), nil
}
