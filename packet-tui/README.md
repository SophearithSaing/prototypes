# packet

`packet` is a keyboard-first terminal HTTP client built with the Bubble Tea v2 stack. It imports Postman Collection v2.0/v2.1 files, keeps cookies automatically for the lifetime of the session, and supports bearer JWTs supplied directly or signed from JSON claims with an HMAC secret.

## Install

```sh
go install ./cmd/packet
```

Run with a scratch request or import one or more collections at startup:

```sh
packet
packet postman_collection.json another_collection.json
```

Postman collection variables are expanded during import. Variables not present in the collection remain in `{{variable}}` form so they are visible and editable.

## Keys

| Key               | Action                                                          |
| ----------------- | --------------------------------------------------------------- |
| `j` / `k`, arrows | Select requests or scroll the response                          |
| `Enter`, `Ctrl+S` | Send the selected request                                       |
| `e`, `b`, `r`     | Focus URL, request body, or response                            |
| `Tab`, `Esc`      | Move to the next panel or return to collections                 |
| `m`               | Cycle HTTP method                                               |
| `v`               | Cycle split, request-only, and response-only views              |
| `/`               | Search requests across all collections                          |
| `H`               | Edit headers as `Name: value` lines                             |
| `a`               | Configure JWT token or HMAC signing (`HS256`, `HS384`, `HS512`) |
| `i`               | Import a Postman collection                                     |
| `?`               | Show the keyboard map                                           |
| `q`, `Ctrl+C`     | Quit                                                            |

HTTP responses are limited to 10 MiB in memory. The cookie jar and request edits are intentionally session-local.
