import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Copy,
  CornerDownLeft,
  Expand,
  FlaskConical,
  Layers3,
  Lightbulb,
  Minimize,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  Server,
  SkipForward,
  Sparkles,
  Terminal,
  Trash2,
  X,
} from "lucide-react";
import RuntimeScene from "./RuntimeScene";
import { emptyFrame, scenarios } from "./scenarios";

const tabIcons = [Box, Layers3, ArrowLeftRight, MousePointer2, Server];
const speeds = [0.5, 1, 1.5, 2];

function highlightedCode(line: string) {
  const parts = line.split(
    /(\/\/.*$|'[^']*'|"[^"]*"|\b(?:const|let|function|async|await|import|from|return)\b|\b(?:console|Promise|process)\b|\b(?:log|setTimeout|setImmediate|queueMicrotask|resolve|then|addEventListener|nextTick|readFile|getData)\b|\b\d+\b|=>)/g,
  );
  return parts.map((part, index) => {
    let type = "";
    if (part.startsWith("//")) type = "comment";
    else if (/^['"]/.test(part)) type = "string";
    else if (
      /^(const|let|function|async|await|import|from|return|=>)$/.test(part)
    )
      type = "keyword";
    else if (/^(console|Promise|process)$/.test(part)) type = "object";
    else if (/^\d+$/.test(part)) type = "number";
    else if (
      /^(log|setTimeout|setImmediate|queueMicrotask|resolve|then|addEventListener|nextTick|readFile|getData)$/.test(
        part,
      )
    )
      type = "function";
    return (
      <span className={type ? `syntax-${type}` : undefined} key={index}>
        {part}
      </span>
    );
  });
}

export default function App() {
  const [scenarioId, setScenarioId] = useState("overview");
  const [frameIndex, setFrameIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [logStart, setLogStart] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const guideRef = useRef<HTMLDialogElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const scenario = scenarios.find((item) => item.id === scenarioId)!;
  const frame = frameIndex < 0 ? emptyFrame : scenario.frames[frameIndex];
  const complete = frameIndex === scenario.frames.length - 1;
  const progress = (frameIndex + 1) / scenario.frames.length;
  const visibleLogs = frame.logs.slice(logStart);

  function reset() {
    setPlaying(false);
    setFrameIndex(-1);
    setLogStart(0);
  }

  function togglePlayback() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (complete || frameIndex === -1) {
      setFrameIndex(0);
      setLogStart(0);
    }
    setPlaying(true);
  }

  function step() {
    setPlaying(false);
    if (!complete) setFrameIndex((current) => current + 1);
  }

  function selectScenario(id: string) {
    if (id === scenarioId) return;
    reset();
    setScenarioId(id);
    setAnswerVisible(false);
    setCopied(false);
    setCopyError(false);
  }

  function openGuide() {
    setPlaying(false);
    guideRef.current?.showModal();
  }

  useEffect(() => {
    if (!playing) return;
    if (complete) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(
      () => setFrameIndex((current) => current + 1),
      1700 / speed,
    );
    return () => window.clearTimeout(timer);
  }, [playing, frameIndex, complete, speed]);

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (
        guideRef.current?.open ||
        target.closest(
          "input, select, textarea, button, a, [contenteditable]",
        ) ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      )
        return;
      if (event.code === "Space") {
        event.preventDefault();
        togglePlayback();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step();
      } else if (event.key.toLowerCase() === "r") {
        reset();
      }
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  });

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    expandRef.current?.focus();
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "Tab") {
        const controls = expandRef.current
          ?.closest("section")
          ?.querySelectorAll<HTMLElement>("button:not(:disabled), select");
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [expanded]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (consoleRef.current)
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [visibleLogs.length]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(scenario.code.join("\n"));
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="brand"
            href="#"
            aria-label="Looplab home"
            onClick={(event) => {
              event.preventDefault();
              selectScenario("overview");
              reset();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="brand-mark">
              <Box size={23} strokeWidth={1.6} />
              <span />
            </span>
            <span>
              looplab<span className="brand-period">.</span>
            </span>
          </a>
          <span className="brand-description">
            Less guessing. More understanding.
          </span>
          <nav className="header-nav" aria-label="Main navigation">
            <a href="#playground" className="nav-active">
              Playground
            </a>
            <button onClick={openGuide}>
              Field guide <ArrowUpRight size={13} />
            </button>
            <span className="version-badge">
              <span /> A LITTLE JS LAB
            </span>
          </nav>
        </div>
      </header>

      <main className="page-shell" id="playground">
        <section className="hero" aria-labelledby="page-title">
          <div>
            <div className="eyebrow hero-eyebrow">
              <span className="tiny-spark">
                <Sparkles size={12} />
              </span>{" "}
              THE JAVASCRIPT EVENT LOOP, EXPLAINED
            </div>
            <h1 id="page-title">
              JavaScript, <em>in motion.</em>
            </h1>
          </div>
          <div className="hero-description">
            <p>
              Go beyond the code. See how your runtime
              <br className="desktop-break" /> turns a little chaos into a
              predictable flow.
            </p>
            <span>
              <span className="small-dot" /> Interactive. Visual. Finally
              clicks.
            </span>
          </div>
        </section>

        <div className="topic-row">
          <div
            className="topic-tabs"
            ref={tabsRef}
            role="tablist"
            aria-label="Event loop concepts"
          >
            {scenarios.map((item, index) => {
              const Icon = tabIcons[index];
              const selected = item.id === scenarioId;
              return (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="simulation-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`topic-tab ${selected ? "is-selected" : ""}`}
                  onClick={() => selectScenario(item.id)}
                  onKeyDown={(event) => {
                    let nextIndex = index;
                    if (event.key === "ArrowRight")
                      nextIndex = (index + 1) % scenarios.length;
                    else if (event.key === "ArrowLeft")
                      nextIndex =
                        (index - 1 + scenarios.length) % scenarios.length;
                    else if (event.key === "Home") nextIndex = 0;
                    else if (event.key === "End")
                      nextIndex = scenarios.length - 1;
                    else return;
                    event.preventDefault();
                    selectScenario(scenarios[nextIndex].id);
                    (
                      tabsRef.current?.children[nextIndex] as HTMLButtonElement
                    )?.focus();
                  }}
                >
                  <Icon size={15} strokeWidth={1.7} />
                  {item.tab}
                  {selected && <span className="tab-indicator" />}
                </button>
              );
            })}
          </div>
          <span className="topic-hint">
            Pick a concept. Follow the flow.
            <ArrowDown size={13} />
          </span>
        </div>

        <div
          id="simulation-panel"
          role="tabpanel"
          aria-labelledby={`tab-${scenarioId}`}
        >
          <div className="workspace-grid">
            <section
              className={`runtime-panel panel ${expanded ? "runtime-expanded" : ""}`}
              role={expanded ? "dialog" : undefined}
              aria-modal={expanded || undefined}
              aria-label="Interactive runtime visualization"
            >
              <div className="panel-heading runtime-heading">
                <div className="panel-title">
                  <span className="panel-icon">
                    <Box size={16} />
                  </span>
                  <h2>The runtime</h2>
                  <span className="runtime-badge">
                    {scenario.runtime === "node" ? "Node.js" : "Browser"}
                  </span>
                </div>
                <div className="panel-actions">
                  <button
                    className="icon-button"
                    ref={expandRef}
                    title={expanded ? "Exit expanded view" : "Expand runtime"}
                    aria-label={
                      expanded ? "Exit expanded view" : "Expand runtime"
                    }
                    aria-expanded={expanded}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? <Minimize size={16} /> : <Expand size={16} />}
                  </button>
                </div>
              </div>

              <RuntimeScene
                frame={frame}
                playing={playing}
                runtime={scenario.runtime}
                speed={speed}
              />

              <div className="runtime-legend" aria-label="Runtime color key">
                <span>
                  <i className="legend-dot stack-dot" />
                  Synchronous
                </span>
                <span>
                  <i className="legend-dot api-dot" />
                  {scenario.runtime === "node" ? "I/O & timers" : "Web APIs"}
                </span>
                <span>
                  <i className="legend-dot micro-dot" />
                  {scenario.runtime === "node" ? "Next tick" : "Microtasks"}
                </span>
                <span>
                  <i className="legend-dot task-dot" />
                  {scenario.runtime === "node" ? "Phase callbacks" : "Tasks"}
                </span>
              </div>

              <div className="playback-controls">
                <button
                  className={`play-button ${playing ? "is-playing" : ""}`}
                  onClick={togglePlayback}
                  aria-label={
                    playing
                      ? "Pause simulation"
                      : complete
                        ? "Replay simulation"
                        : frameIndex < 0
                          ? "Run simulation"
                          : "Resume simulation"
                  }
                >
                  {playing ? (
                    <Pause size={15} fill="currentColor" />
                  ) : complete ? (
                    <RotateCcw size={16} />
                  ) : (
                    <Play size={14} fill="currentColor" />
                  )}
                  <span>
                    {playing
                      ? "Pause"
                      : complete
                        ? "Run again"
                        : frameIndex < 0
                          ? "Run simulation"
                          : "Resume"}
                  </span>
                </button>
                <button
                  className="step-button"
                  onClick={step}
                  disabled={complete}
                  title="Advance one step"
                >
                  <SkipForward size={15} />
                  <span>Step</span>
                </button>
                <button
                  className="icon-button reset-button"
                  onClick={reset}
                  disabled={frameIndex === -1}
                  title="Reset simulation"
                  aria-label="Reset simulation"
                >
                  <RotateCcw size={16} />
                </button>
                <div className="playback-right">
                  <label className="speed-select">
                    <span className="sr-only">Playback speed</span>
                    <select
                      aria-label="Playback speed"
                      value={speed}
                      onChange={(event) => setSpeed(Number(event.target.value))}
                    >
                      {speeds.map((value) => (
                        <option key={value} value={value}>
                          {value}x
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={12} />
                  </label>
                  <span className="playback-divider" />
                  <span className="step-counter">
                    <strong>{String(frameIndex + 1).padStart(2, "0")}</strong>
                    <span>
                      / {String(scenario.frames.length).padStart(2, "0")}
                    </span>
                  </span>
                </div>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Simulation progress"
                aria-valuemin={0}
                aria-valuemax={scenario.frames.length}
                aria-valuenow={frameIndex + 1}
              >
                <div style={{ width: `${progress * 100}%` }} />
              </div>
            </section>

            <section
              className="experiment-panel panel"
              aria-labelledby="experiment-title"
            >
              <div className="experiment-intro">
                <div className="eyebrow">
                  <FlaskConical size={13} /> THE EXPERIMENT{" "}
                  <span>
                    {String(scenarios.indexOf(scenario) + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 id="experiment-title">{scenario.title}</h2>
                <p>{scenario.subtitle}</p>
              </div>
              <div className="code-area">
                <div className="code-heading">
                  <span>
                    <span className="js-file">JS</span>
                    {scenario.filename}
                  </span>
                  <button
                    className={`icon-button ${copied ? "copy-success" : ""}`}
                    onClick={copyCode}
                    aria-label={copied ? "Code copied" : "Copy code"}
                    title={copied ? "Copied!" : "Copy code"}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <div
                  className="code-content"
                  aria-label="Simulation source code"
                >
                  <pre>
                    <code>
                      {scenario.code.map((line, index) => (
                        <span
                          key={index}
                          className={`code-line ${frame.line === index + 1 ? "active-line" : ""}`}
                          aria-current={
                            frame.line === index + 1 ? "step" : undefined
                          }
                        >
                          <span className="line-number" aria-hidden="true">
                            {index + 1}
                          </span>
                          <span className="line-content">
                            {highlightedCode(line) || " "}
                          </span>
                          {frame.line === index + 1 && (
                            <span className="line-active-marker" />
                          )}
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
                {copyError && (
                  <p className="copy-error" role="status">
                    Clipboard unavailable. You can select and copy the code
                    above.
                  </p>
                )}
              </div>
              <div className="console-panel">
                <div className="console-heading">
                  <h3>
                    <Terminal size={13} /> Console output{" "}
                    <span>{visibleLogs.length}</span>
                  </h3>
                  <button
                    className="icon-button"
                    title="Clear console"
                    aria-label="Clear console"
                    disabled={!visibleLogs.length}
                    onClick={() => setLogStart(frame.logs.length)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div
                  className="console-content"
                  ref={consoleRef}
                  role="log"
                  aria-label="Console output"
                  aria-live="polite"
                >
                  {visibleLogs.length ? (
                    visibleLogs.map((log, index) => (
                      <div
                        className="console-line"
                        key={`${logStart + index}-${log}`}
                      >
                        <span className="console-chevron">&rsaquo;</span>
                        <span>{log}</span>
                        <span className="console-order">
                          {String(logStart + index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="console-empty">
                      <span>&rsaquo;</span>
                      <p>
                        {logStart
                          ? "Console cleared. Keep the flow going."
                          : "A quiet console. Let's change that."}
                        <span>
                          {logStart
                            ? "New messages will appear here."
                            : "Run the simulation to see the output."}
                        </span>
                      </p>
                      <span className="console-cursor" />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          <section
            className={`explanation-strip ${complete ? "is-complete" : ""}`}
            aria-label="Current step explanation"
            aria-live="polite"
          >
            <div className="explanation-icon">
              {complete ? (
                <Check size={20} />
              ) : frameIndex === -1 ? (
                <Lightbulb size={21} />
              ) : (
                <ArrowRight size={20} />
              )}
            </div>
            <div className="explanation-main">
              <div className="eyebrow">
                {complete
                  ? "THE LOOP, UNDERSTOOD"
                  : frameIndex < 0
                    ? "BEFORE YOU PRESS PLAY"
                    : `STEP ${String(frameIndex + 1).padStart(2, "0")} / FOLLOW THE FLOW`}
              </div>
              <h3>{frame.title}</h3>
              <p>{frame.description}</p>
            </div>
            <div className="prediction">
              <div>
                <span className="prediction-spark">
                  <Sparkles size={13} />
                </span>
                <span>A LITTLE FOOD FOR THOUGHT</span>
              </div>
              <button
                onClick={() => setAnswerVisible(!answerVisible)}
                aria-expanded={answerVisible}
              >
                {scenario.question}
                <ArrowUpRight size={15} />
              </button>
            </div>
          </section>
          {answerVisible && (
            <div className="answer-panel">
              <CircleHelp size={18} />
              <p>{scenario.answer}</p>
              <button
                className="icon-button"
                onClick={() => setAnswerVisible(false)}
                aria-label="Hide answer"
              >
                <X size={15} />
              </button>
            </div>
          )}

          <section className="takeaways" aria-labelledby="takeaways-heading">
            <div className="takeaways-heading">
              <h2 id="takeaways-heading">The things to take with you.</h2>
              <span>No memorization required. Just a mental model.</span>
            </div>
            <div className="takeaway-grid">
              {scenario.concepts.map((concept, index) => (
                <article className="takeaway-card" key={concept.title}>
                  <span className={`concept-number concept-${index}`}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3>{concept.title}</h3>
                    <p>{concept.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <footer className="site-footer">
          <div>
            <span className="footer-mark">
              <Box size={13} />
            </span>
            Made for curious minds.<span className="footer-dot">&middot;</span>
            <button onClick={openGuide}>
              A simplified model, by design <ArrowUpRight size={11} />
            </button>
          </div>
          <div className="keyboard-hints">
            <span>
              <kbd>space</kbd> play / pause
            </span>
            <span>
              <kbd>
                <ArrowRight size={9} />
              </kbd>{" "}
              step
            </span>
            <span>
              <kbd>R</kbd> reset
            </span>
          </div>
        </footer>
      </main>

      <dialog
        className="guide-dialog"
        aria-labelledby="guide-title"
        ref={guideRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) guideRef.current?.close();
        }}
      >
        <div className="guide-content">
          <div className="guide-top">
            <span className="eyebrow">
              <BookOpen size={14} /> THE FIELD GUIDE
            </span>
            <button
              className="icon-button"
              onClick={() => guideRef.current?.close()}
              aria-label="Close field guide"
            >
              <X size={20} />
            </button>
          </div>
          <h2 id="guide-title">
            A runtime,
            <br />
            <em>not a race.</em>
          </h2>
          <p className="guide-lead">
            JavaScript does one thing at a time. Its host environment makes that
            feel like many things at once.
          </p>
          <div className="guide-steps">
            <section>
              <span className="guide-number">01</span>
              <div>
                <h3>Pick a concept. Press play.</h3>
                <p>
                  Each tab is a small, deterministic teaching simulation. Watch
                  the highlighted code, moving tasks, and console together. The
                  examples are modeled, not evaluated in your browser.
                </p>
              </div>
            </section>
            <section>
              <span className="guide-number">02</span>
              <div>
                <h3>Slow down the invisible parts.</h3>
                <p>
                  Pause whenever you like, advance with Step, or change the
                  playback speed. The entire runtime is 3D, arranged like a flat
                  diagram. Blocks slide along its paths from one slot to the
                  next, without jumping through space. Click a component to
                  understand its role.
                </p>
              </div>
            </section>
            <section>
              <span className="guide-number">03</span>
              <div>
                <h3>Keep the model, not every detail.</h3>
                <p>
                  Browser hosts have multiple task sources, not one universal
                  FIFO queue. Rendering happens at opportunities, not after
                  every task. Our diagram groups work to focus on execution
                  order.
                </p>
              </div>
            </section>
            <section>
              <span className="guide-number">04</span>
              <div>
                <h3>Node has a different rhythm.</h3>
                <p>
                  The Node.js example groups libuv phase callbacks, shows its
                  separate nextTick queue, and models modern Node behavior
                  inside an I/O callback. It is not a complete map of every
                  phase or promise checkpoint.
                </p>
              </div>
            </section>
          </div>
          <div className="guide-insight">
            <Lightbulb size={20} />
            <p>{scenario.insight}</p>
          </div>
          <a
            className="docs-link"
            href={
              scenario.runtime === "node"
                ? "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick"
                : "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
            }
            target="_blank"
            rel="noreferrer"
          >
            Go deeper in the {scenario.runtime === "node" ? "Node.js" : "MDN"}{" "}
            docs <ArrowUpRight size={15} />
          </a>
          <button
            className="guide-start play-button"
            onClick={() => guideRef.current?.close()}
          >
            Back to the playground <CornerDownLeft size={15} />
          </button>
          <div className="guide-bottom">
            <Code2 size={13} /> SMALL EXAMPLES. BIG AHA MOMENTS.
          </div>
        </div>
      </dialog>
    </>
  );
}
