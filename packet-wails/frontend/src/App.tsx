import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Archive,
  Braces,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Command,
  Cookie,
  Copy,
  Download,
  FileJson,
  Folder,
  FolderOpen,
  Globe2,
  History,
  Eye,
  EyeOff,
  Import,
  KeyRound,
  Layers3,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import {
  clearCookies,
  generateJWT,
  importPostman,
  KeyValue,
  RequestModel,
  ResponseModel,
  sendRequest,
} from "./api";

type EditorTab = "params" | "headers" | "body" | "auth";
type ResponseTab = "body" | "headers" | "request";
type Collection = { id: string; name: string; requests: RequestModel[] };
type AuthState = {
  enabled: boolean;
  algorithm: string;
  secret: string;
  payload: string;
  token: string;
  error: string;
};
type Toast = { kind: "success" | "error"; message: string } | null;
type EnvVariable = KeyValue & { secret: boolean };
type Environment = { id: string; name: string; variables: EnvVariable[] };

const emptyPair = (): KeyValue => ({ key: "", value: "", enabled: true });
const emptyVariable = (): EnvVariable => ({
  key: "",
  value: "",
  enabled: true,
  secret: false,
});
const makeRequest = (name = "Untitled request"): RequestModel => ({
  id: crypto.randomUUID(),
  name,
  method: "GET",
  url: "",
  headers: [emptyPair()],
  params: [emptyPair()],
  body: "",
});

const starter: Collection[] = [
  {
    id: "scratchpad",
    name: "Scratchpad",
    requests: [
      {
        ...makeRequest("Echo request"),
        id: "welcome",
        url: "https://httpbin.org/anything",
        params: [
          { key: "source", value: "packet", enabled: true },
          emptyPair(),
        ],
      },
    ],
  },
];

const normalizeRequest = (request: Partial<RequestModel>): RequestModel => ({
  id: request.id || crypto.randomUUID(),
  name: request.name || "Untitled request",
  folder: request.folder || "",
  method: request.method || "GET",
  url: request.url || "",
  headers:
    Array.isArray(request.headers) && request.headers.length
      ? request.headers
      : [emptyPair()],
  params:
    Array.isArray(request.params) && request.params.length
      ? request.params
      : [emptyPair()],
  body: request.body || "",
});

const normalizeCollections = (collections: Collection[]): Collection[] =>
  collections.map((collection) => ({
    id: collection.id || crypto.randomUUID(),
    name: collection.name || "Imported collection",
    requests: Array.isArray(collection.requests)
      ? collection.requests.map(normalizeRequest)
      : [],
  }));

const defaultAuth = (): AuthState => ({
  enabled: false,
  algorithm: "HS256",
  secret: "",
  payload:
    '{\n  "sub": "user_123",\n  "role": "admin",\n  "iat": 1787400000\n}',
  token: "",
  error: "",
});

const loadCollections = (): Collection[] => {
  try {
    const saved = localStorage.getItem("packet.collections");
    return saved ? normalizeCollections(JSON.parse(saved)) : starter;
  } catch {
    return starter;
  }
};

const loadZoom = () => {
  const saved = Number(localStorage.getItem("packet.zoom") || 100);
  return Number.isFinite(saved) ? Math.min(200, Math.max(80, saved)) : 100;
};

const loadEnvironments = (): Environment[] => {
  try {
    const saved = JSON.parse(
      localStorage.getItem("packet.environments") || "[]",
    );
    if (Array.isArray(saved) && saved.length)
      return saved.map((environment) => ({
        id: environment.id || crypto.randomUUID(),
        name: environment.name || "Environment",
        variables:
          Array.isArray(environment.variables) && environment.variables.length
            ? environment.variables.map((variable: Partial<EnvVariable>) => ({
                key: variable.key || "",
                value: variable.value || "",
                enabled: variable.enabled !== false,
                secret: variable.secret === true,
              }))
            : [emptyVariable()],
      }));
  } catch {
    /* start with the local configuration */
  }
  return [{ id: "local", name: "Local", variables: [emptyVariable()] }];
};

const interpolate = (value: string, variables: EnvVariable[]) => {
  const values = new Map(
    variables
      .filter((variable) => variable.enabled && variable.key.trim())
      .map((variable) => [variable.key.trim(), variable.value]),
  );
  return value.replace(
    /\{\{\s*([^{}]+?)\s*\}\}|\$\{([^{}]+)\}/g,
    (match, postmanKey, shellKey) =>
      values.get((postmanKey || shellKey).trim()) ?? match,
  );
};

const resolveRequestVariables = (
  request: RequestModel,
  variables: EnvVariable[],
): RequestModel => ({
  ...request,
  url: interpolate(request.url, variables),
  headers: (request.headers || []).map((row) => ({
    ...row,
    key: interpolate(row.key, variables),
    value: interpolate(row.value, variables),
  })),
  params: (request.params || []).map((row) => ({
    ...row,
    key: interpolate(row.key, variables),
    value: interpolate(row.value, variables),
  })),
  body: interpolate(request.body, variables),
});

const methodTone = (method: string) =>
  ({
    GET: "green",
    POST: "amber",
    PUT: "blue",
    PATCH: "violet",
    DELETE: "red",
  })[method] || "muted";

function App() {
  const [collections, setCollections] = useState<Collection[]>(loadCollections);
  const [activeId, setActiveId] = useState(
    () => loadCollections()[0]?.requests[0]?.id || "",
  );
  const [openIds, setOpenIds] = useState<string[]>(["welcome"]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    scratchpad: true,
  });
  const [editorTab, setEditorTab] = useState<EditorTab>("params");
  const [responseTab, setResponseTab] = useState<ResponseTab>("body");
  const [response, setResponse] = useState<ResponseModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [toast, setToast] = useState<Toast>(null);
  const [authByRequest, setAuthByRequest] = useState<Record<string, AuthState>>(
    {},
  );
  const [cookieCount, setCookieCount] = useState(0);
  const [zoom, setZoom] = useState(loadZoom);
  const [environments, setEnvironments] =
    useState<Environment[]>(loadEnvironments);
  const [activeEnvironmentId, setActiveEnvironmentId] = useState(
    () => localStorage.getItem("packet.activeEnvironment") || "local",
  );
  const [environmentOpen, setEnvironmentOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const urlInput = useRef<HTMLInputElement>(null);

  const allRequests = useMemo(
    () => collections.flatMap((collection) => collection.requests),
    [collections],
  );
  const current =
    allRequests.find((request) => request.id === activeId) || allRequests[0];
  const auth = current
    ? authByRequest[current.id] || defaultAuth()
    : defaultAuth();
  const openRequests = openIds
    .map((id) => allRequests.find((request) => request.id === id))
    .filter(Boolean) as RequestModel[];
  const activeEnvironment =
    environments.find(
      (environment) => environment.id === activeEnvironmentId,
    ) || environments[0];
  const environmentVariables = activeEnvironment?.variables || [];
  const resolvedAuthSecret = interpolate(auth.secret, environmentVariables);
  const resolvedAuthPayload = interpolate(auth.payload, environmentVariables);

  useEffect(
    () =>
      localStorage.setItem("packet.collections", JSON.stringify(collections)),
    [collections],
  );
  useEffect(
    () =>
      localStorage.setItem("packet.environments", JSON.stringify(environments)),
    [environments],
  );
  useEffect(() => {
    const validId = environments.some(
      (environment) => environment.id === activeEnvironmentId,
    )
      ? activeEnvironmentId
      : environments[0]?.id;
    if (validId && validId !== activeEnvironmentId)
      setActiveEnvironmentId(validId);
    if (validId) localStorage.setItem("packet.activeEnvironment", validId);
  }, [activeEnvironmentId, environments]);
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const scale = zoom / 100;
    root.style.transform = `scale(${scale})`;
    root.style.transformOrigin = "top left";
    root.style.width = `${100 / scale}%`;
    root.style.height = `${100 / scale}%`;
    localStorage.setItem("packet.zoom", String(zoom));
  }, [zoom]);
  useEffect(() => {
    if (toast) {
      const timer = window.setTimeout(() => setToast(null), 3200);
      return () => window.clearTimeout(timer);
    }
  }, [toast]);

  const selectRequest = useCallback((id: string) => {
    setActiveId(id);
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setResponse(null);
  }, []);

  const updateCurrent = useCallback(
    (patch: Partial<RequestModel>) => {
      setCollections((items) =>
        items.map((collection) => ({
          ...collection,
          requests: collection.requests.map((request) =>
            request.id === activeId ? { ...request, ...patch } : request,
          ),
        })),
      );
    },
    [activeId],
  );

  const updateAuth = useCallback(
    (patch: Partial<AuthState>) => {
      if (!activeId) return;
      setAuthByRequest((states) => ({
        ...states,
        [activeId]: { ...(states[activeId] || defaultAuth()), ...patch },
      }));
    },
    [activeId],
  );

  useEffect(() => {
    if (!current || !auth.enabled || !resolvedAuthSecret.trim()) return;
    const timer = window.setTimeout(async () => {
      try {
        const token = await generateJWT(
          auth.algorithm,
          resolvedAuthSecret,
          resolvedAuthPayload,
        );
        setAuthByRequest((states) => ({
          ...states,
          [current.id]: {
            ...(states[current.id] || defaultAuth()),
            token,
            error: "",
          },
        }));
      } catch (error) {
        setAuthByRequest((states) => ({
          ...states,
          [current.id]: {
            ...(states[current.id] || defaultAuth()),
            token: "",
            error: errorMessage(error),
          },
        }));
      }
    }, 280);
    return () => window.clearTimeout(timer);
  }, [
    current?.id,
    auth.enabled,
    auth.algorithm,
    resolvedAuthSecret,
    resolvedAuthPayload,
  ]);

  const newRequest = useCallback(() => {
    const request = makeRequest();
    setCollections((items) =>
      items.map((collection, index) =>
        index === 0
          ? { ...collection, requests: [...collection.requests, request] }
          : collection,
      ),
    );
    setExpanded((items) => ({
      ...items,
      [collections[0]?.id || "scratchpad"]: true,
    }));
    setOpenIds((ids) => [...ids, request.id]);
    setActiveId(request.id);
    setResponse(null);
    window.setTimeout(() => urlInput.current?.focus(), 50);
  }, [collections]);

  const zoomIn = useCallback(
    () => setZoom((value) => Math.min(200, value + 10)),
    [],
  );
  const zoomOut = useCallback(
    () => setZoom((value) => Math.max(80, value - 10)),
    [],
  );
  const resetZoom = useCallback(() => setZoom(100), []);

  const closeTab = (id: string) => {
    setOpenIds((ids) => {
      const next = ids.filter((item) => item !== id);
      if (id === activeId)
        setActiveId(next[next.length - 1] || allRequests[0]?.id || "");
      return next;
    });
  };

  const executeSend = useCallback(async () => {
    if (!current || !current.url.trim() || loading) {
      if (!current?.url.trim()) {
        urlInput.current?.focus();
        setToast({ kind: "error", message: "Enter a request URL first" });
      }
      return;
    }
    setLoading(true);
    setResponse(null);
    try {
      let outgoing = resolveRequestVariables(current, environmentVariables);
      if (auth.enabled) {
        const token = await generateJWT(
          auth.algorithm,
          resolvedAuthSecret,
          resolvedAuthPayload,
        );
        const headers = outgoing.headers.filter(
          (header) => header.key.toLowerCase() !== "authorization",
        );
        outgoing = {
          ...outgoing,
          headers: [
            { key: "Authorization", value: `Bearer ${token}`, enabled: true },
            ...headers,
          ],
        };
        updateAuth({ token, error: "" });
      }
      const result = await sendRequest(outgoing);
      setResponse(result);
      setCookieCount(result.cookieCount);
      setResponseTab("body");
    } catch (error) {
      setToast({ kind: "error", message: errorMessage(error) });
    } finally {
      setLoading(false);
    }
  }, [
    current,
    loading,
    auth,
    environmentVariables,
    resolvedAuthPayload,
    resolvedAuthSecret,
    updateAuth,
  ]);

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importPostman(await file.text());
      const collection = {
        id: crypto.randomUUID(),
        name: imported.name || file.name.replace(/\.json$/i, ""),
        requests: Array.isArray(imported.requests)
          ? imported.requests.map(normalizeRequest)
          : [],
      };
      if (collection.requests.length === 0)
        throw new Error(
          "The Postman collection does not contain any supported requests",
        );
      setCollections((items) => [...items, collection]);
      setExpanded((items) => ({ ...items, [collection.id]: true }));
      const importedVariables = Array.isArray(imported.variables)
        ? imported.variables
        : [];
      if (importedVariables.length) {
        const environment: Environment = {
          id: crypto.randomUUID(),
          name: `${collection.name} config`,
          variables: [
            ...importedVariables.map((variable) => ({
              ...variable,
              enabled: variable.enabled !== false,
              secret: /secret|token|password|api.?key/i.test(variable.key),
            })),
            emptyVariable(),
          ],
        };
        setEnvironments((items) => [...items, environment]);
        setActiveEnvironmentId(environment.id);
      }
      if (collection.requests[0]) selectRequest(collection.requests[0].id);
      setToast({
        kind: "success",
        message: `Imported ${collection.requests.length} requests${importedVariables.length ? ` and ${importedVariables.length} variables` : ""} from ${collection.name}`,
      });
    } catch (error) {
      setToast({ kind: "error", message: errorMessage(error) });
    } finally {
      event.target.value = "";
    }
  };

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
        setPaletteQuery("");
      }
      if (mod && event.key.toLowerCase() === "l") {
        event.preventDefault();
        urlInput.current?.focus();
        urlInput.current?.select();
      }
      if (mod && event.key === "Enter") {
        event.preventDefault();
        void executeSend();
      }
      if (mod && event.key.toLowerCase() === "n") {
        event.preventDefault();
        newRequest();
      }
      if (mod && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setSidebarOpen((value) => !value);
      }
      if (mod && event.shiftKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
        fileInput.current?.click();
      }
      if (mod && event.shiftKey && event.key.toLowerCase() === "e") {
        event.preventDefault();
        setEnvironmentOpen(true);
      }
      if (mod && (event.key === "+" || event.key === "=")) {
        event.preventDefault();
        zoomIn();
      }
      if (mod && event.key === "-") {
        event.preventDefault();
        zoomOut();
      }
      if (mod && event.key === "0") {
        event.preventDefault();
        resetZoom();
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [executeSend, newRequest, resetZoom, zoomIn, zoomOut]);

  const commands = useMemo(
    () =>
      [
        {
          icon: Plus,
          name: "New request",
          shortcut: "⌘ N",
          action: newRequest,
        },
        {
          icon: Send,
          name: "Send current request",
          shortcut: "⌘ ↵",
          action: () => void executeSend(),
        },
        {
          icon: Import,
          name: "Import Postman collection",
          shortcut: "⌘ ⇧ I",
          action: () => fileInput.current?.click(),
        },
        {
          icon: sidebarOpen ? PanelLeftClose : PanelLeftOpen,
          name: "Toggle sidebar",
          shortcut: "⌘ B",
          action: () => setSidebarOpen((value) => !value),
        },
        {
          icon: Globe2,
          name: "Configure environments",
          shortcut: "⌘ ⇧ E",
          action: () => setEnvironmentOpen(true),
        },
        { icon: Plus, name: "Zoom in", shortcut: "⌘ +", action: zoomIn },
        { icon: Minus, name: "Zoom out", shortcut: "⌘ −", action: zoomOut },
        {
          icon: RotateCcw,
          name: "Reset zoom",
          shortcut: "⌘ 0",
          action: resetZoom,
        },
        ...allRequests.map((request) => ({
          icon: FileJson,
          name: `Open: ${request.name}`,
          shortcut: request.method,
          action: () => selectRequest(request.id),
        })),
      ].filter((command) =>
        command.name.toLowerCase().includes(paletteQuery.toLowerCase()),
      ),
    [
      allRequests,
      executeSend,
      newRequest,
      paletteQuery,
      resetZoom,
      selectRequest,
      sidebarOpen,
      zoomIn,
      zoomOut,
    ],
  );

  if (!current)
    return (
      <div className="empty-app">
        <Zap size={28} />
        <h1>Packet</h1>
        <button onClick={newRequest}>Create a request</button>
      </div>
    );

  return (
    <div className="app-shell">
      <input
        ref={fileInput}
        className="hidden"
        type="file"
        accept="application/json,.json"
        onChange={handleImport}
      />
      <header className="topbar" data-wails-drag>
        <div className="brand">
          <span className="brand-mark">
            <Zap size={15} fill="currentColor" />
          </span>
          <strong>Packet</strong>
        </div>
        <button
          className="workspace-switch"
          data-wails-no-drag
          onClick={() => setEnvironmentOpen(true)}
          title="Configure environments"
        >
          <span className="presence-dot" />{" "}
          {activeEnvironment?.name || "No environment"}{" "}
          <ChevronDown size={13} />
        </button>
        <button
          className="command-trigger"
          data-wails-no-drag
          onClick={() => setPaletteOpen(true)}
        >
          <Search size={15} />
          <span>Search requests or run a command</span>
          <kbd>⌘ K</kbd>
        </button>
        <div className="top-actions" data-wails-no-drag>
          <button className="icon-button" title="Help">
            <CircleHelp size={17} />
          </button>
          <button className="icon-button" title="Settings">
            <Settings size={17} />
          </button>
          <span className="avatar">SP</span>
        </div>
      </header>

      <div className="desktop">
        <nav className="activity-bar">
          <button
            className={`activity ${environmentOpen ? "" : "active"}`}
            title="Collections"
          >
            <Layers3 size={19} />
            <span>Collections</span>
          </button>
          <button className="activity" title="History">
            <History size={19} />
            <span>History</span>
          </button>
          <button
            className={`activity ${environmentOpen ? "active" : ""}`}
            title="Environments"
            onClick={() => setEnvironmentOpen(true)}
          >
            <Globe2 size={19} />
            <span>Envs</span>
          </button>
          <div className="activity-spacer" />
          <button className="activity" title="Settings">
            <Settings size={19} />
          </button>
        </nav>

        {sidebarOpen && (
          <aside className="sidebar">
            <div className="sidebar-heading">
              <span>Collections</span>
              <div>
                <button
                  title="Import Postman collection"
                  onClick={() => fileInput.current?.click()}
                >
                  <Download size={15} />
                </button>
                <button title="New request" onClick={newRequest}>
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="filter">
              <Search size={14} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Filter requests"
              />
              <span className="filter-hint">⌥F</span>
            </div>
            <div className="collections-scroll">
              {collections.map((collection) => (
                <CollectionTree
                  key={collection.id}
                  collection={collection}
                  activeId={activeId}
                  search={search}
                  expanded={expanded[collection.id] ?? true}
                  onToggle={() =>
                    setExpanded((items) => ({
                      ...items,
                      [collection.id]: !(items[collection.id] ?? true),
                    }))
                  }
                  onSelect={selectRequest}
                />
              ))}
            </div>
            <button
              className="import-card"
              onClick={() => fileInput.current?.click()}
            >
              <span>
                <Import size={16} />
              </span>
              <div>
                <strong>Import collection</strong>
                <small>Postman v2.0 or v2.1 JSON</small>
              </div>
              <ChevronRight size={15} />
            </button>
          </aside>
        )}

        <main className="workspace">
          <div className="tabbar">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((value) => !value)}
              title="Toggle sidebar"
            >
              {sidebarOpen ? (
                <PanelLeftClose size={16} />
              ) : (
                <PanelLeftOpen size={16} />
              )}
            </button>
            <div className="request-tabs">
              {openRequests.map((request) => (
                <button
                  key={request.id}
                  className={`request-tab ${request.id === activeId ? "active" : ""}`}
                  onClick={() => selectRequest(request.id)}
                >
                  <span
                    className={`method-dot ${methodTone(request.method)}`}
                  />{" "}
                  <span>{request.name}</span>
                  <X
                    size={13}
                    onClick={(event) => {
                      event.stopPropagation();
                      closeTab(request.id);
                    }}
                  />
                </button>
              ))}
            </div>
            <button
              className="new-tab"
              onClick={newRequest}
              title="New request"
            >
              <Plus size={16} />
            </button>
          </div>

          <section className="request-panel">
            <div className="request-title-row">
              <div>
                <input
                  className="request-name"
                  value={current.name}
                  onChange={(event) =>
                    updateCurrent({ name: event.target.value })
                  }
                />
                <span className="save-state">
                  <Check size={12} /> Saved locally
                </span>
              </div>
              <button className="outline-button">
                <Code2 size={15} /> Generate code
              </button>
              <button className="icon-button">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="url-composer">
              <MethodPicker
                value={current.method}
                onChange={(method) => updateCurrent({ method })}
              />
              <input
                ref={urlInput}
                value={current.url}
                onChange={(event) => updateCurrent({ url: event.target.value })}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter") void executeSend();
                }}
                spellCheck={false}
                placeholder="https://api.example.com/v1/resource"
              />
              <button
                className="send-button"
                onClick={() => void executeSend()}
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : <Send size={16} />}
                <span>{loading ? "Sending" : "Send"}</span>
                <kbd>⌘↵</kbd>
              </button>
            </div>

            <div className="editor-tabs">
              {(["params", "headers", "body", "auth"] as EditorTab[]).map(
                (tab) => (
                  <button
                    key={tab}
                    className={editorTab === tab ? "active" : ""}
                    onClick={() => setEditorTab(tab)}
                  >
                    {capitalize(tab)}
                    {tab === "params" && activeCount(current.params) > 0 && (
                      <em>{activeCount(current.params)}</em>
                    )}
                    {tab === "headers" && activeCount(current.headers) > 0 && (
                      <em>{activeCount(current.headers)}</em>
                    )}
                    {tab === "auth" && auth.enabled && (
                      <span className="auth-on" />
                    )}
                  </button>
                ),
              )}
            </div>
            <div className="editor-content">
              {editorTab === "params" && (
                <KeyValueEditor
                  title="Query parameters"
                  rows={current.params || []}
                  onChange={(params) => updateCurrent({ params })}
                />
              )}
              {editorTab === "headers" && (
                <KeyValueEditor
                  title="Request headers"
                  rows={current.headers || []}
                  onChange={(headers) => updateCurrent({ headers })}
                />
              )}
              {editorTab === "body" && (
                <BodyEditor
                  value={current.body}
                  onChange={(body) => updateCurrent({ body })}
                />
              )}
              {editorTab === "auth" && (
                <AuthEditor value={auth} onChange={updateAuth} />
              )}
            </div>
          </section>

          <section className="response-panel">
            <div className="response-head">
              <div className="response-tabs">
                {(["body", "headers", "request"] as ResponseTab[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      className={responseTab === tab ? "active" : ""}
                      onClick={() => setResponseTab(tab)}
                    >
                      {tab === "request" ? "Request headers" : capitalize(tab)}
                      {response && tab === "headers" && (
                        <em>{response.headers.length}</em>
                      )}
                    </button>
                  ),
                )}
              </div>
              {response && (
                <div className="response-metrics">
                  <span
                    className={`status status-${Math.floor(response.status / 100)}`}
                  >
                    {response.status}{" "}
                    {response.statusText.replace(/^\d+\s*/, "")}
                  </span>
                  <span>
                    <Clock3 size={13} /> {response.durationMs} ms
                  </span>
                  <span>
                    <Archive size={13} /> {formatBytes(response.sizeBytes)}
                  </span>
                  <button
                    title="Copy response"
                    onClick={() => navigator.clipboard.writeText(response.body)}
                  >
                    <Copy size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="response-body">
              {loading ? (
                <div className="response-empty">
                  <span className="loader-orbit">
                    <Zap size={20} />
                  </span>
                  <strong>Sending request</strong>
                  <small>Waiting for the server to respond…</small>
                </div>
              ) : !response ? (
                <div className="response-empty">
                  <span>
                    <TerminalSquare size={23} />
                  </span>
                  <strong>Ready when you are</strong>
                  <small>
                    Press <kbd>⌘ ↵</kbd> to send this request
                  </small>
                </div>
              ) : responseTab === "body" ? (
                <ResponseBody body={response.body} />
              ) : (
                <HeaderTable
                  rows={
                    responseTab === "headers"
                      ? response.headers
                      : response.requestHeaders
                  }
                />
              )}
            </div>
          </section>
        </main>
      </div>

      <footer className="statusbar">
        <div>
          <span className="connected">
            <span /> Backend ready
          </span>
          <button
            className="active-env-status"
            onClick={() => setEnvironmentOpen(true)}
          >
            <Globe2 size={11} /> {activeEnvironment?.name || "No environment"}
          </button>
          <span>HTTP/2</span>
        </div>
        <div>
          <button
            onClick={async () => {
              await clearCookies();
              setCookieCount(0);
              setToast({ kind: "success", message: "Cookie jar cleared" });
            }}
            title="Clear cookies"
          >
            <Cookie size={13} /> Cookie jar · {cookieCount}
          </button>
          <span className="zoom-controls">
            <button
              onClick={zoomOut}
              disabled={zoom <= 80}
              title="Zoom out (Ctrl/Cmd -)"
            >
              <Minus size={11} />
            </button>
            <button
              className="zoom-value"
              onClick={resetZoom}
              title="Reset zoom (Ctrl/Cmd 0)"
            >
              {zoom}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoom >= 200}
              title="Zoom in (Ctrl/Cmd +)"
            >
              <Plus size={11} />
            </button>
          </span>
          <span>UTF-8</span>
          <span>Packet 0.1.0</span>
        </div>
      </footer>

      {paletteOpen && (
        <CommandPalette
          query={paletteQuery}
          onQuery={setPaletteQuery}
          commands={commands}
          onClose={() => setPaletteOpen(false)}
        />
      )}
      {environmentOpen && (
        <EnvironmentPanel
          environments={environments}
          activeId={activeEnvironment?.id || ""}
          onActive={setActiveEnvironmentId}
          onChange={setEnvironments}
          onClose={() => setEnvironmentOpen(false)}
        />
      )}
      {toast && (
        <div className={`toast ${toast.kind}`}>
          {toast.kind === "success" ? <Check size={16} /> : <X size={16} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

function CollectionTree({
  collection,
  activeId,
  search,
  expanded,
  onToggle,
  onSelect,
}: {
  collection: Collection;
  activeId: string;
  search: string;
  expanded: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
}) {
  const visible = collection.requests.filter((request) =>
    `${request.folder} ${request.name} ${request.method}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const grouped = visible.reduce<Record<string, RequestModel[]>>(
    (groups, request) => {
      (groups[request.folder || ""] ||= []).push(request);
      return groups;
    },
    {},
  );
  return (
    <div className="collection">
      <button className="collection-row" onClick={onToggle}>
        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {expanded ? <FolderOpen size={15} /> : <Folder size={15} />}
        <strong>{collection.name}</strong>
        <small>{visible.length}</small>
        <MoreHorizontal size={14} />
      </button>
      {expanded && (
        <div className="collection-items">
          {Object.entries(grouped).map(([folder, requests]) => (
            <div key={folder}>
              {folder && (
                <div className="folder-label">
                  <ChevronDown size={12} />
                  <span>{folder}</span>
                </div>
              )}
              {requests.map((request) => (
                <button
                  key={request.id}
                  className={`request-row ${request.id === activeId ? "active" : ""}`}
                  onClick={() => onSelect(request.id)}
                >
                  <span
                    className={`method-label ${methodTone(request.method)}`}
                  >
                    {request.method}
                  </span>
                  <span>{request.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EnvironmentPanel({
  environments,
  activeId,
  onActive,
  onChange,
  onClose,
}: {
  environments: Environment[];
  activeId: string;
  onActive: (id: string) => void;
  onChange: React.Dispatch<React.SetStateAction<Environment[]>>;
  onClose: () => void;
}) {
  const selected =
    environments.find((environment) => environment.id === activeId) ||
    environments[0];

  const addEnvironment = () => {
    const environment: Environment = {
      id: crypto.randomUUID(),
      name: `Environment ${environments.length + 1}`,
      variables: [emptyVariable()],
    };
    onChange((items) => [...items, environment]);
    onActive(environment.id);
  };

  const updateSelected = (patch: Partial<Environment>) => {
    if (!selected) return;
    onChange((items) =>
      items.map((environment) =>
        environment.id === selected.id
          ? { ...environment, ...patch }
          : environment,
      ),
    );
  };

  const removeSelected = () => {
    if (!selected || environments.length === 1) return;
    const next = environments.filter(
      (environment) => environment.id !== selected.id,
    );
    onChange(next);
    onActive(next[0].id);
  };

  const rows = selected?.variables?.length
    ? selected.variables
    : [emptyVariable()];
  const setRow = (index: number, patch: Partial<EnvVariable>) => {
    const next = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, ...patch } : row,
    );
    if (index === next.length - 1 && (next[index].key || next[index].value))
      next.push(emptyVariable());
    updateSelected({ variables: next });
  };

  return (
    <div className="environment-backdrop" onMouseDown={onClose}>
      <section
        className="environment-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>
              <Globe2 size={18} />
            </span>
            <div>
              <strong>Environment configuration</strong>
              <small>
                Manage reusable variables for requests and authentication.
              </small>
            </div>
          </div>
          <button onClick={onClose} title="Close">
            <X size={17} />
          </button>
        </header>
        <div className="environment-layout">
          <aside>
            <div className="environment-list-head">
              <span>Configurations</span>
              <button onClick={addEnvironment} title="New environment">
                <Plus size={14} />
              </button>
            </div>
            <div className="environment-list">
              {environments.map((environment) => (
                <button
                  key={environment.id}
                  className={environment.id === activeId ? "active" : ""}
                  onClick={() => onActive(environment.id)}
                >
                  <span>
                    <Globe2 size={14} />
                    {environment.name}
                  </span>
                  {environment.id === activeId && <Check size={13} />}
                </button>
              ))}
            </div>
          </aside>
          <main>
            {selected && (
              <>
                <div className="environment-title">
                  <label>
                    <span>Configuration name</span>
                    <input
                      value={selected.name}
                      onChange={(event) =>
                        updateSelected({ name: event.target.value })
                      }
                    />
                  </label>
                  <button
                    className="delete-environment"
                    onClick={removeSelected}
                    disabled={environments.length === 1}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
                <div className="environment-help">
                  <Braces size={15} />
                  <span>
                    Use variables anywhere as <code>{"{{baseUrl}}"}</code> or{" "}
                    <code>{"${baseUrl}"}</code>. Values are substituted only
                    when a request is sent.
                  </span>
                </div>
                <div className="environment-variables-head">
                  <span>Variables</span>
                  <small>
                    {rows.filter((row) => row.enabled && row.key).length}{" "}
                    enabled
                  </small>
                </div>
                <div className="environment-table">
                  <div className="environment-row heading">
                    <span />
                    <span>Variable</span>
                    <span>Value</span>
                    <span>Secret</span>
                    <span />
                  </div>
                  {rows.map((row, index) => (
                    <div className="environment-row" key={index}>
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={row.enabled}
                          onChange={(event) =>
                            setRow(index, { enabled: event.target.checked })
                          }
                        />
                        <span>
                          <Check size={10} />
                        </span>
                      </label>
                      <input
                        value={row.key}
                        onChange={(event) =>
                          setRow(index, { key: event.target.value })
                        }
                        placeholder="baseUrl"
                        spellCheck={false}
                      />
                      <div className="environment-value">
                        <input
                          type={row.secret ? "password" : "text"}
                          value={row.value}
                          onChange={(event) =>
                            setRow(index, { value: event.target.value })
                          }
                          placeholder="https://api.example.com"
                          spellCheck={false}
                        />
                        {row.value && (
                          <button
                            onClick={() =>
                              setRow(index, { secret: !row.secret })
                            }
                            title={row.secret ? "Show value" : "Mask value"}
                          >
                            {row.secret ? (
                              <EyeOff size={13} />
                            ) : (
                              <Eye size={13} />
                            )}
                          </button>
                        )}
                      </div>
                      <button
                        className={`secret-toggle ${row.secret ? "active" : ""}`}
                        onClick={() => setRow(index, { secret: !row.secret })}
                        title="Mark as secret"
                      >
                        <KeyRound size={13} />
                      </button>
                      <button
                        className="remove-variable"
                        onClick={() =>
                          updateSelected({
                            variables: rows.filter(
                              (_, rowIndex) => rowIndex !== index,
                            ),
                          })
                        }
                        disabled={rows.length === 1}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
        <footer>
          <span>
            <span className="presence-dot" /> {selected?.name} is active
          </span>
          <button onClick={onClose}>
            <Check size={13} /> Done
          </button>
        </footer>
      </section>
    </div>
  );
}

function MethodPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"];
  return (
    <div className="method-picker">
      <button
        className={methodTone(value)}
        onClick={() => setOpen((value) => !value)}
      >
        {value}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="method-menu">
          {methods.map((method) => (
            <button
              key={method}
              className={methodTone(method)}
              onClick={() => {
                onChange(method);
                setOpen(false);
              }}
            >
              {method}
              {method === value && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function KeyValueEditor({
  title,
  rows,
  onChange,
}: {
  title: string;
  rows: KeyValue[];
  onChange: (rows: KeyValue[]) => void;
}) {
  const safeRows = rows.length ? rows : [emptyPair()];
  const setRow = (index: number, patch: Partial<KeyValue>) => {
    const next = safeRows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, ...patch } : row,
    );
    if (index === next.length - 1 && (next[index].key || next[index].value))
      next.push(emptyPair());
    onChange(next);
  };
  return (
    <div className="kv-editor">
      <div className="editor-label">
        <span>{title}</span>
        <button onClick={() => onChange([...safeRows, emptyPair()])}>
          <Plus size={13} /> Add
        </button>
      </div>
      <div className="kv-table">
        <div className="kv-head">
          <span />
          <span>Key</span>
          <span>Value</span>
          <span />
        </div>
        {safeRows.map((row, index) => (
          <div className="kv-row" key={index}>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={row.enabled}
                onChange={(event) =>
                  setRow(index, { enabled: event.target.checked })
                }
              />
              <span>
                <Check size={10} />
              </span>
            </label>
            <input
              value={row.key}
              onChange={(event) => setRow(index, { key: event.target.value })}
              placeholder="Key"
            />
            <input
              value={row.value}
              onChange={(event) => setRow(index, { value: event.target.value })}
              placeholder="Value"
            />
            <button
              className="delete-row"
              onClick={() =>
                onChange(safeRows.filter((_, rowIndex) => rowIndex !== index))
              }
              disabled={safeRows.length === 1}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BodyEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (body: string) => void;
}) {
  const format = () => {
    try {
      onChange(JSON.stringify(JSON.parse(value || "{}"), null, 2));
    } catch {
      /* keep invalid JSON editable */
    }
  };
  return (
    <div className="body-editor">
      <div className="editor-label">
        <div>
          <span>Request body</span>
          <span className="body-mode">
            JSON <ChevronDown size={12} />
          </span>
        </div>
        <button onClick={format}>
          <Braces size={13} /> Format
        </button>
      </div>
      <div className="code-editor">
        <div className="line-numbers">
          {Array.from(
            { length: Math.max(8, value.split("\n").length) },
            (_, index) => (
              <span key={index}>{index + 1}</span>
            ),
          )}
        </div>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          placeholder={'{\n  "message": "Hello, Packet"\n}'}
        />
      </div>
    </div>
  );
}

function AuthEditor({
  value,
  onChange,
}: {
  value: AuthState;
  onChange: (patch: Partial<AuthState>) => void;
}) {
  return (
    <div className="auth-editor">
      <div className="auth-intro">
        <span>
          <ShieldCheck size={18} />
        </span>
        <div>
          <strong>JWT authentication</strong>
          <small>
            Packet signs the payload locally and adds a Bearer token before
            sending.
          </small>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={(event) => onChange({ enabled: event.target.checked })}
          />
          <span />
        </label>
      </div>
      <div className={`auth-grid ${value.enabled ? "" : "disabled"}`}>
        <label>
          <span>Algorithm</span>
          <select
            value={value.algorithm}
            onChange={(event) => onChange({ algorithm: event.target.value })}
          >
            <option>HS256</option>
            <option>HS384</option>
            <option>HS512</option>
          </select>
        </label>
        <label className="secret-field">
          <span>Signing secret</span>
          <div>
            <KeyRound size={14} />
            <input
              type="password"
              value={value.secret}
              onChange={(event) => onChange({ secret: event.target.value })}
              placeholder="Enter a local secret"
            />
          </div>
        </label>
        <label className="payload-field">
          <span>Payload (JSON)</span>
          <textarea
            value={value.payload}
            onChange={(event) => onChange({ payload: event.target.value })}
            spellCheck={false}
          />
        </label>
        <div className="token-preview">
          <span>
            Generated token{" "}
            <em>
              <Sparkles size={11} /> Auto
            </em>
          </span>
          <code>
            {value.error ||
              value.token ||
              "A signed JWT will appear here as you type."}
          </code>
          {value.token && (
            <button onClick={() => navigator.clipboard.writeText(value.token)}>
              <Copy size={13} /> Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ResponseBody({ body }: { body: string }) {
  let formatted = body;
  let isJSON = false;
  try {
    formatted = JSON.stringify(JSON.parse(body), null, 2);
    isJSON = true;
  } catch {
    /* display raw */
  }
  return (
    <div className="response-code">
      <div className="response-code-head">
        <span>{isJSON ? "JSON" : "TEXT"}</span>
        <span>{formatted.split("\n").length} lines</span>
      </div>
      <pre>{isJSON ? colorizeJSON(formatted) : formatted}</pre>
    </div>
  );
}

function colorizeJSON(value: string) {
  return value.split("\n").map((line, index) => (
    <div className="json-line" key={index}>
      <span className="line-no">{index + 1}</span>
      <span>
        {line
          .split(
            /("(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?)/g,
          )
          .map((part, partIndex) => {
            let className = "";
            if (/^".*"$/.test(part))
              className =
                /"\s*$/.test(part) && line.includes(`${part}:`)
                  ? "json-key"
                  : "json-string";
            else if (/^(true|false|null)$/.test(part)) className = "json-bool";
            else if (/^-?\d/.test(part)) className = "json-number";
            return (
              <span className={className} key={partIndex}>
                {part}
              </span>
            );
          })}
      </span>
    </div>
  ));
}

function HeaderTable({ rows }: { rows: KeyValue[] }) {
  return (
    <div className="header-table">
      <div>
        <strong>Header</strong>
        <strong>Value</strong>
      </div>
      {rows.map((row, index) => (
        <div key={`${row.key}-${index}`}>
          <code>{row.key}</code>
          <span>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function CommandPalette({
  query,
  onQuery,
  commands,
  onClose,
}: {
  query: string;
  onQuery: (value: string) => void;
  commands: {
    icon: typeof Plus;
    name: string;
    shortcut: string;
    action: () => void;
  }[];
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const run = (index: number) => {
    commands[index]?.action();
    onClose();
  };
  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" onMouseDown={(event) => event.stopPropagation()}>
        <div className="palette-input">
          <Command size={18} />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              onQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelected((value) =>
                  Math.min(value + 1, commands.length - 1),
                );
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelected((value) => Math.max(value - 1, 0));
              }
              if (event.key === "Enter") run(selected);
            }}
            placeholder="Type a command or search requests…"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="palette-label">Commands</div>
        <div className="palette-results">
          {commands.slice(0, 8).map((command, index) => (
            <button
              key={`${command.name}-${index}`}
              className={index === selected ? "selected" : ""}
              onMouseEnter={() => setSelected(index)}
              onClick={() => run(index)}
            >
              <span>
                <command.icon size={16} />
                {command.name}
              </span>
              <kbd>{command.shortcut}</kbd>
            </button>
          ))}
          {commands.length === 0 && (
            <div className="no-results">No matching commands</div>
          )}
        </div>
        <div className="palette-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
        </div>
      </div>
    </div>
  );
}

const activeCount = (rows: KeyValue[] | null | undefined) =>
  (rows || []).filter((row) => row.enabled && row.key.trim()).length;
const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);
const formatBytes = (bytes: number) =>
  bytes < 1024
    ? `${bytes} B`
    : bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

export default App;
