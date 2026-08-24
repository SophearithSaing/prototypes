CC ?= cc
PKG_CONFIG ?= pkg-config
WINDRES ?= windres
GLIB_COMPILE_RESOURCES ?= glib-compile-resources
VERSION ?= 0.1.0
APP_NAME := scratchpad
CFLAGS ?= -O2 -g
GTK_CFLAGS := $(shell $(PKG_CONFIG) --cflags gtk4 2>/dev/null)
GTK_LIBS := $(shell $(PKG_CONFIG) --libs gtk4 2>/dev/null)
APP_CFLAGS :=
APP_LIBS :=
RESOURCE_SOURCE := build/generated/scratchpad-resources.c
ICON_SIZES := 16 24 32 48 64 128 256
ICON_FILES := $(foreach size,$(ICON_SIZES),assets/scratchpad-$(size).png)

EXEEXT :=
WINDOWS_RESOURCE :=
WINDOWS_LDFLAGS :=

ifeq ($(OS),Windows_NT)
EXEEXT := .exe
WINDOWS_RESOURCE := build/windows/scratchpad-resource.o
WINDOWS_LDFLAGS := -mwindows
else
APP_CFLAGS += $(shell $(PKG_CONFIG) --cflags fontconfig 2>/dev/null)
APP_LIBS += $(shell $(PKG_CONFIG) --libs fontconfig 2>/dev/null)
endif

CFLAGS += -std=c11 -Wall -Wextra $(GTK_CFLAGS) $(APP_CFLAGS)
LDLIBS += $(GTK_LIBS) $(APP_LIBS)

TARGET := $(APP_NAME)$(EXEEXT)

.PHONY: all run install install-user uninstall package-windows clean

all: $(TARGET)

$(TARGET): main.c $(RESOURCE_SOURCE) $(WINDOWS_RESOURCE)
	@$(PKG_CONFIG) --exists 'gtk4 >= 4.12' || { echo "GTK 4.12 or newer development files not found. See README.md for install commands." >&2; exit 1; }
	$(CC) $(CFLAGS) main.c $(RESOURCE_SOURCE) $(WINDOWS_RESOURCE) -o $@ $(LDFLAGS) $(WINDOWS_LDFLAGS) $(LDLIBS)

$(RESOURCE_SOURCE): assets/scratchpad.gresource.xml assets/fonts/JetBrainsMono-Regular.ttf $(ICON_FILES)
	@mkdir -p $(@D)
	$(GLIB_COMPILE_RESOURCES) $< --sourcedir=assets --generate-source --target=$@

build/windows/scratchpad-resource.o: windows/scratchpad.rc windows/scratchpad.manifest assets/scratchpad.ico
	@mkdir -p $(@D)
	$(WINDRES) -I. -DAPP_VERSION_NUMBER=$(subst .,$(comma),$(VERSION)),0 -DAPP_VERSION=$(VERSION) $< -O coff -o $@

run: $(TARGET)
	./$(TARGET)

install: $(TARGET)
	install -Dm755 $(TARGET) $(DESTDIR)$(PREFIX)/bin/scratchpad
	install -Dm644 scratchpad.desktop $(DESTDIR)$(PREFIX)/share/applications/com.example.Scratchpad.desktop
	@for size in $(ICON_SIZES); do \
		install -Dm644 assets/scratchpad-$$size.png \
			$(DESTDIR)$(PREFIX)/share/icons/hicolor/$${size}x$${size}/apps/com.example.Scratchpad.png; \
	done
	@if [ -z "$(DESTDIR)" ] && command -v gtk4-update-icon-cache >/dev/null 2>&1; then gtk4-update-icon-cache -q -t $(PREFIX)/share/icons/hicolor; fi
	@if [ -z "$(DESTDIR)" ] && command -v update-desktop-database >/dev/null 2>&1; then update-desktop-database -q $(PREFIX)/share/applications; fi

install-user:
	$(MAKE) install PREFIX="$(HOME)/.local"

uninstall:
	rm -f $(DESTDIR)$(PREFIX)/bin/scratchpad
	rm -f $(DESTDIR)$(PREFIX)/share/applications/com.example.Scratchpad.desktop
	@for size in $(ICON_SIZES); do \
		rm -f $(DESTDIR)$(PREFIX)/share/icons/hicolor/$${size}x$${size}/apps/com.example.Scratchpad.png; \
	done
	@if [ -z "$(DESTDIR)" ] && command -v gtk4-update-icon-cache >/dev/null 2>&1; then gtk4-update-icon-cache -q -t $(PREFIX)/share/icons/hicolor; fi
	@if [ -z "$(DESTDIR)" ] && command -v update-desktop-database >/dev/null 2>&1; then update-desktop-database -q $(PREFIX)/share/applications; fi

ifeq ($(OS),Windows_NT)
package-windows: $(TARGET)
	bash scripts/package-windows.sh $(VERSION)
else
package-windows:
	@echo "The Windows package must be built from an MSYS2 UCRT64 shell on Windows." >&2
	@exit 1
endif

clean:
	rm -f scratchpad scratchpad.exe build/windows/scratchpad-resource.o $(RESOURCE_SOURCE)

PREFIX ?= /usr/local
comma := ,
