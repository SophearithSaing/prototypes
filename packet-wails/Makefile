WAILS_TAGS := production

ifeq ($(shell uname -s),Linux)
ifneq ($(shell pkg-config --exists webkit2gtk-4.1 2>/dev/null && echo yes),)
WAILS_TAGS := production,webkit2_41
endif
endif

.PHONY: run build windows frontend test check-native

run: check-native frontend
	go run -tags "$(WAILS_TAGS)" .

build: check-native frontend
	mkdir -p build/bin
	go build -tags "$(WAILS_TAGS)" -o build/bin/Packet .

windows: frontend
	mkdir -p build/bin
	GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -tags "desktop,production" -ldflags "-w -s -H windowsgui" -o build/bin/Packet.exe .

frontend:
	npm --prefix frontend run build

test:
	go test ./...
	npm --prefix frontend run build

ifeq ($(shell uname -s),Linux)
check-native:
	@pkg-config --exists gtk+-3.0 || (echo "Missing GTK development files. On Ubuntu/Linux Mint run: sudo apt install libgtk-3-dev libwebkit2gtk-4.1-dev"; exit 1)
	@(pkg-config --exists webkit2gtk-4.0 || pkg-config --exists webkit2gtk-4.1) || (echo "Missing WebKitGTK development files. On Ubuntu/Linux Mint run: sudo apt install libgtk-3-dev libwebkit2gtk-4.1-dev"; exit 1)
else
check-native:
	@true
endif
