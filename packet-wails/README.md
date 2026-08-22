# Packet

Packet is a keyboard-first desktop HTTP client built with Wails, Go, React, and TypeScript.

## Included

- GET, POST, PUT, PATCH, DELETE, and HEAD requests
- Query, header, JSON body, and response inspectors
- Postman Collection v2.0/v2.1 JSON import, including nested folders
- Automatic cookie storage and replay through Go's standards-compliant cookie jar
- Locally generated HS256, HS384, and HS512 JWT bearer tokens from JSON payloads and a secret
- Local collection persistence, request tabs, filtering, and a command palette
- Named environment configurations with persistent, maskable variables

## Environments

Open the environment editor from the globe icon, the active environment name in the top bar, or `Cmd/Ctrl + Shift + E`. Variables support both Postman and shell-style placeholders:

```text
{{baseUrl}}/v1/users
Authorization: Bearer ${apiToken}
```

The active configuration is resolved immediately before sending across URLs, query parameters, headers, request bodies, and JWT secrets/payloads. Saved request templates keep their placeholders. Collection-level Postman variables are imported into a new active configuration automatically.

## Run

Install the frontend dependencies once:

```bash
npm --prefix frontend install
```

On Ubuntu 24.04 or Linux Mint 22, install Wails' native build dependencies:

```bash
sudo apt install build-essential pkg-config libgtk-3-dev libwebkit2gtk-4.1-dev
```

Then launch Packet from the project root:

```bash
make run
```

`make run` builds the frontend, supplies Wails' required `production` tag, and automatically selects the installed WebKitGTK 4.0 or 4.1 API. Plain `go run .` is not a valid Wails launch command because it omits that build tag.

To create a production binary at `build/bin/Packet`:

```bash
make build
```

To cross-compile a 64-bit Windows executable from Linux:

```bash
make windows
```

The Windows build is written to `build/bin/Packet.exe`. Windows 10/11 must have the Microsoft WebView2 Runtime installed; Windows 11 normally includes it.

For hot reload, install the matching Wails CLI and run it with the WebKit 4.1 tag on current Ubuntu/Linux Mint:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@v2.10.2
"$(go env GOPATH)/bin/wails" dev -tags webkit2_41
```

## Keyboard shortcuts

| Shortcut               | Action                        |
| ---------------------- | ----------------------------- |
| `Cmd/Ctrl + K`         | Open the command palette      |
| `Cmd/Ctrl + Enter`     | Send the current request      |
| `Cmd/Ctrl + L`         | Focus and select the URL      |
| `Cmd/Ctrl + N`         | Create a request              |
| `Cmd/Ctrl + B`         | Toggle the collection sidebar |
| `Cmd/Ctrl + Shift + I` | Import a Postman collection   |
| `Cmd/Ctrl + Shift + E` | Configure environments        |
| `Cmd/Ctrl + +`         | Increase interface zoom       |
| `Cmd/Ctrl + -`         | Decrease interface zoom       |
| `Cmd/Ctrl + 0`         | Reset interface zoom to 100%  |

JWT secrets never leave the Go process except as part of the locally signed bearer token attached to the request.
