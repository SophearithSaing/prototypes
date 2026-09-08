import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Copy,
  GitBranch,
  Globe2,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import CareerScene from "./CareerScene";
import type { SceneActions } from "./CareerScene";
import BrandIcon from "./BrandIcon";
import { milestones, projects, skills } from "./data";
import type { Milestone, Project, SkillName } from "./data";

const sections = [
  "Home",
  "About",
  "Experience",
  "Skills",
  "Projects",
  "Contact",
];
type Detail =
  | { type: "milestone"; item: Milestone }
  | { type: "project"; item: Project }
  | null;

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className={`project-preview ${project.className}`} aria-hidden="true">
      {project.className === "nexus" && (
        <div className="nexus-window">
          <div className="mock-sidebar">
            <span className="nexus-symbol">
              n<span>.</span>
            </span>
            <span className="mock-nav active">
              <Globe2 size={12} />
            </span>
            <span className="mock-nav">
              <GitBranch size={12} />
            </span>
            <span className="mock-nav">
              <Code2 size={12} />
            </span>
            <span className="mock-nav">
              <Terminal size={12} />
            </span>
            <span className="mock-avatar">AR</span>
          </div>
          <div className="nexus-content">
            <div className="mock-topline">
              <span>
                Workspace <ChevronRight size={8} /> Overview
              </span>
              <span className="mock-live">All systems operational</span>
            </div>
            <div className="mock-greeting">
              A good day to build
              <span>Here's what's happening with your projects.</span>
            </div>
            <div className="mock-stat-row">
              <div>
                <span>Deployments</span>
                <strong>
                  128 <small>+24%</small>
                </strong>
              </div>
              <div>
                <span>Uptime</span>
                <strong>
                  99.98<small>%</small>
                </strong>
              </div>
              <div>
                <span>Active projects</span>
                <strong>12</strong>
              </div>
            </div>
            <div className="mock-deployments">
              <span>Recent deployments</span>
              {["portfolio-web", "api-gateway", "design-system"].map(
                (name, index) => (
                  <div key={name}>
                    <span className="deploy-dot" />
                    <strong>{name}</strong>
                    <span className="mock-branch">main</span>
                    <span>{index * 4 + 2}m ago</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      {project.className === "pulse" && (
        <div className="pulse-window">
          <div className="pulse-header">
            <span className="pulse-logo">
              <span /> pulse
            </span>
            <span>
              Overview <span className="dim">Audiences &nbsp; Events</span>
            </span>
            <span className="pulse-period">Last 30 days</span>
          </div>
          <div className="pulse-main">
            <div className="pulse-metric">
              <span>Your product, in motion.</span>
              <strong>
                284,592{" "}
                <small>
                  +18.6% <ArrowUpRight size={10} />
                </small>
              </strong>
              <span>Total events this month</span>
            </div>
            <div className="pulse-chart">
              <div className="chart-grid" />
              {[
                20, 32, 24, 42, 35, 30, 48, 42, 58, 46, 65, 53, 62, 73, 65, 78,
                71, 85, 75, 93, 82, 95, 86, 100,
              ].map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%`, opacity: 0.4 + index / 40 }}
                />
              ))}
            </div>
            <div className="chart-axis">
              <span>JUN 01</span>
              <span>JUN 15</span>
              <span>JUN 30</span>
            </div>
          </div>
        </div>
      )}
      {project.className === "form-field" && (
        <div className="field-window">
          <div className="field-header">
            <span>
              form & field<span>LANDSCAPE / ARCHITECTURE</span>
            </span>
            <span>
              Selected work <Plus size={9} />
            </span>
          </div>
          <div className="field-title">
            Rooted in nature.
            <br />
            Designed for life.
          </div>
          <div className="field-landscape">
            <div className="field-sun" />
            <div className="field-hill hill-back" />
            <div className="field-hill hill-front" />
            <div className="field-grid" />
          </div>
          <div className="field-caption">
            <span>A CONVERSATION BETWEEN LAND & LIVING</span>
            <ArrowUpRight size={15} />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailDialog({
  detail,
  onClose,
}: {
  detail: Detail;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (detail) {
      if (!dialog.open) dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    if (dialog.open) dialog.close();
  }, [detail]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="detail-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
      aria-labelledby="detail-title"
    >
      {detail && (
        <div
          className="dialog-inner"
          style={{ "--accent": detail.item.color } as CSSProperties}
        >
          <button
            className="dialog-close icon-button"
            onClick={closeDialog}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
          {detail.type === "milestone" ? (
            <>
              <div className="dialog-eyebrow">
                <span className="status-dot" /> THE JOURNEY /{" "}
                {detail.item.period}
              </div>
              <div className="dialog-year">
                {detail.item.year}
                <span>
                  <GitBranch size={34} strokeWidth={1} />
                </span>
              </div>
              <h2 id="detail-title">{detail.item.label}</h2>
              <p className="dialog-role">
                {detail.item.role} <span>at {detail.item.company}</span>
              </p>
              <p className="dialog-description">{detail.item.description}</p>
              <div className="dialog-highlights">
                {detail.item.highlights.map((highlight) => (
                  <p key={highlight}>
                    <ArrowUpRight size={17} />
                    <span>{highlight}</span>
                  </p>
                ))}
              </div>
              <div className="stack-tags">
                {detail.item.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <button
                className="text-link dialog-bottom-link"
                onClick={closeDialog}
              >
                BACK TO THE MAP <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <>
              <div className="dialog-eyebrow">
                PROJECT {detail.item.number} / {detail.item.category}
              </div>
              <h2 id="detail-title" className="project-dialog-title">
                {detail.item.name}
              </h2>
              <ProjectPreview project={detail.item} />
              <p className="dialog-description">
                {detail.item.longDescription}
              </p>
              <div className="dialog-highlights">
                {detail.item.results.map((result) => (
                  <p key={result}>
                    <ArrowUpRight size={17} />
                    <span>{result}</span>
                  </p>
                ))}
              </div>
              <div className="stack-tags">
                {detail.item.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a
                className="text-link dialog-bottom-link"
                href="#contact"
                onClick={closeDialog}
              >
                LET'S BUILD SOMETHING LIKE THIS <ArrowRight size={16} />
              </a>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPossiblePaths, setShowPossiblePaths] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [detail, setDetail] = useState<Detail>(null);
  const [skillFilter, setSkillFilter] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillName | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const sceneActions = useRef<SceneActions | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function selectSkill(skill: SkillName) {
    setSelectedSkill(skill);
    setSkillFilter("All");
    document.getElementById("skills")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("hello@alexrivera.dev");
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Let's build something - ${data.get("name")}`;
    const body = `Hi Alex,\n\n${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
    window.location.href = `mailto:hello@alexrivera.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus(
      "Your draft is ready in your email app. If it didn't open, email hello@alexrivera.dev directly.",
    );
  }

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to portfolio content
      </a>
      <header
        className={`site-header${activeSection !== "home" ? " header-scrolled" : ""}`}
      >
        <a
          className="identity"
          href="#home"
          aria-label="Alex Rivera, home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="monogram">AR</span>
          <span className="identity-name">ALEX RIVERA</span>
          <span className="identity-divider" />
          <span className="identity-role">Software Engineer</span>
        </a>
        <nav
          className={`main-nav${menuOpen ? " menu-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className={
                activeSection === section.toLowerCase() ? "active" : ""
              }
              aria-current={
                activeSection === section.toLowerCase() ? "page" : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {section}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#projects">
          VIEW MY WORK <ChevronRight size={17} />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" /> A THREE.JS POWERED RESUME
            </div>
            <h1 id="hero-title">
              My <span className="career-word">career.</span>
              <br />
              <span className="visualized-word">Visualized.</span>
            </h1>
            <div className="short-rule" />
            <p>
              An interactive 3D map of my journey
              <br className="desktop-break" /> across infinite possibilities.
              <br className="desktop-break" /> Hover, orbit, and explore the
              path
              <br className="desktop-break" /> that's real.
            </p>
            <a href="#experience" className="journey-link">
              EXPLORE MY JOURNEY{" "}
              <span>
                <ArrowRight size={19} />
              </span>
            </a>
            <div className="hero-availability">
              <span className="status-dot" /> OPEN TO WHAT'S NEXT
            </div>
          </div>

          <CareerScene
            onMilestoneSelect={(item) => setDetail({ type: "milestone", item })}
            onSkillSelect={selectSkill}
            showPossiblePaths={showPossiblePaths}
            actionsRef={sceneActions}
            onReady={setSceneReady}
          />

          <div className="map-status">
            <span className="status-dot" /> LIVE CAREER MAP{" "}
            <span className="map-status-divider">/</span>
            <span>V.2026</span>
          </div>
          <div className="map-tools" role="group" aria-label="3D map controls">
            <button
              aria-label="Zoom in"
              disabled={!sceneReady}
              title="Zoom in"
              onClick={() => sceneActions.current?.zoomIn()}
            >
              <Plus size={15} />
            </button>
            <button
              aria-label="Zoom out"
              disabled={!sceneReady}
              title="Zoom out"
              onClick={() => sceneActions.current?.zoomOut()}
            >
              <Minus size={15} />
            </button>
            <span />
            <button
              aria-label="Reset map view"
              disabled={!sceneReady}
              title="Reset view"
              onClick={() => sceneActions.current?.reset()}
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <div className="orbit-guide">
            <span className="mouse-icon">
              <span />
            </span>
            <div>
              <span>
                {sceneReady ? "DRAG TO ORBIT" : "EXPLORE THE TIMELINE"}
              </span>
              <span>
                {sceneReady
                  ? "CTRL + SCROLL TO ZOOM"
                  : "SELECT A CAREER MILESTONE"}
              </span>
            </div>
          </div>
          <div className="map-caption">
            <span className="caption-cross">+</span>
            <span>
              ONE JOURNEY.
              <br />
              <strong>INFINITE POSSIBILITIES.</strong>
            </span>
          </div>
          <div className="map-legend">
            <div>
              <span className="legend-real" />
              <span>MY JOURNEY</span>
            </div>
            <button
              aria-pressed={showPossiblePaths}
              disabled={!sceneReady}
              onClick={() => setShowPossiblePaths(!showPossiblePaths)}
              title="Toggle possible paths"
            >
              <span
                className={`legend-possible${!showPossiblePaths ? " paths-hidden" : ""}`}
              />
              <span>POSSIBLE PATHS</span>
              <span className="legend-toggle">
                {showPossiblePaths ? <Minus size={10} /> : <Plus size={10} />}
              </span>
            </button>
          </div>
          <div className="hero-footer">
            <span>
              <span className="tiny-cross">+</span> BUILT WITH CURIOSITY.
              POWERED BY CODE.
            </span>
            <a href="#about">
              SCROLL TO DISCOVER <ArrowDown size={12} />
            </a>
            <span className="hero-pagination">
              <strong>01</strong>
              <span>/</span>06
            </span>
          </div>
        </section>

        <section
          id="about"
          className="content-section about-section"
          aria-labelledby="about-title"
        >
          <div className="section-label">
            <span>01 / ABOUT</span>
            <span className="section-label-right">
              THE HUMAN BEHIND THE CODE
            </span>
          </div>
          <div className="about-grid">
            <div>
              <h2 id="about-title">
                Curious by nature.
                <br />
                <span>Engineer by choice.</span>
              </h2>
              <p className="section-copy">
                I'm Alex, a software engineer who believes the best digital
                experiences live somewhere between thoughtful engineering and a
                little creative ambition.
              </p>
              <p className="section-copy muted-copy">
                For the past six years, I've been connecting the dots between
                people, products, and technology. I love a complex problem, a
                simple solution, and the feeling of shipping something that
                matters.
              </p>
              <a className="text-link" href="#contact">
                A GOOD CONVERSATION STARTS HERE <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="about-terminal">
              <div className="terminal-top">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <span>alex-rivera.ts</span>
                <Code2 size={14} />
              </div>
              <div className="terminal-code">
                <div>
                  <span className="line-number">01</span>
                  <span>
                    <span className="code-purple">const</span>{" "}
                    <span className="code-cyan">engineer</span> = {"{"}
                  </span>
                </div>
                <div>
                  <span className="line-number">02</span>
                  <span>
                    &nbsp; name:{" "}
                    <span className="code-lime">'Alex Rivera'</span>,
                  </span>
                </div>
                <div>
                  <span className="line-number">03</span>
                  <span>
                    &nbsp; focus:{" "}
                    <span className="code-lime">'Meaningful experiences'</span>,
                  </span>
                </div>
                <div>
                  <span className="line-number">04</span>
                  <span>&nbsp; approach: [</span>
                </div>
                <div>
                  <span className="line-number">05</span>
                  <span>
                    &nbsp; &nbsp;{" "}
                    <span className="code-lime">'Think deeply'</span>,
                  </span>
                </div>
                <div>
                  <span className="line-number">06</span>
                  <span>
                    &nbsp; &nbsp;{" "}
                    <span className="code-lime">'Build thoughtfully'</span>,
                  </span>
                </div>
                <div>
                  <span className="line-number">07</span>
                  <span>
                    &nbsp; &nbsp;{" "}
                    <span className="code-lime">'Never stop exploring'</span>
                  </span>
                </div>
                <div>
                  <span className="line-number">08</span>
                  <span>&nbsp; ],</span>
                </div>
                <div>
                  <span className="line-number">09</span>
                  <span>
                    &nbsp; nextChapter:{" "}
                    <span className="code-cyan">undefined</span>
                  </span>
                </div>
                <div>
                  <span className="line-number">10</span>
                  <span>{"}"};</span>
                </div>
                <div className="terminal-comment">
                  <span className="line-number">11</span>
                  <span>// The best part is still unwritten.</span>
                </div>
              </div>
              <div className="terminal-bottom">
                <span>
                  <span className="status-dot" /> ALWAYS A WORK IN PROGRESS
                </span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>
          <div className="stats-row">
            <div>
              <strong>
                6<span>+</span>
              </strong>
              <span>YEARS OF BUILDING</span>
            </div>
            <div>
              <strong>
                20<span>+</span>
              </strong>
              <span>PROJECTS SHIPPED</span>
            </div>
            <div>
              <strong>04</strong>
              <span>CHAPTERS SO FAR</span>
            </div>
            <div>
              <strong className="infinity-stat">&#8734;</strong>
              <span>POSSIBILITIES AHEAD</span>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="content-section experience-section"
          aria-labelledby="experience-title"
        >
          <div className="section-label">
            <span>02 / EXPERIENCE</span>
            <span className="section-label-right">
              EVERY CHAPTER BUILDS ON THE LAST
            </span>
          </div>
          <div className="section-heading">
            <h2 id="experience-title">
              Not a straight line.
              <br />
              <span>A meaningful one.</span>
            </h2>
            <p className="section-copy">
              A few pivotal moments. A lot of small steps.
              <br />
              Here's how the journey has unfolded.
            </p>
          </div>
          <div className="experience-list">
            {[...milestones].reverse().map((milestone, index) => (
              <button
                className="experience-row"
                key={milestone.year}
                style={{ "--accent": milestone.color } as CSSProperties}
                onClick={() =>
                  setDetail({ type: "milestone", item: milestone })
                }
              >
                <div className="experience-period">
                  <span className="experience-dot" />
                  {milestone.period}
                </div>
                <div className="experience-role">
                  <h3>
                    {milestone.role}
                    {index === 0 && (
                      <span className="current-tag">CURRENT</span>
                    )}
                  </h3>
                  <span>{milestone.company}</span>
                </div>
                <p>{milestone.label}</p>
                <ArrowUpRight
                  className="experience-arrow"
                  size={23}
                  strokeWidth={1.4}
                />
              </button>
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="content-section skills-section"
          aria-labelledby="skills-title"
        >
          <div className="section-label">
            <span>03 / THE TOOLKIT</span>
            <span className="section-label-right">
              GOOD TOOLS. BETTER POSSIBILITIES.
            </span>
          </div>
          <div className="section-heading">
            <h2 id="skills-title">
              A stack with
              <br />
              <span>room to explore.</span>
            </h2>
            <div
              className="skill-filters"
              role="group"
              aria-label="Filter skills"
            >
              {["All", "Frontend", "Backend", "Infrastructure"].map(
                (filter) => (
                  <button
                    key={filter}
                    className={skillFilter === filter ? "selected" : ""}
                    aria-pressed={skillFilter === filter}
                    onClick={() => {
                      setSkillFilter(filter);
                      setSelectedSkill(null);
                    }}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="skills-grid">
            {skills
              .filter(
                (skill) =>
                  skillFilter === "All" || skill.category === skillFilter,
              )
              .map((skill) => (
                <article
                  key={skill.name}
                  className={`skill-card${selectedSkill === skill.name ? " skill-highlighted" : ""}`}
                  style={{ "--accent": skill.color } as CSSProperties}
                >
                  <div className="skill-card-top">
                    <BrandIcon name={skill.name} size={35} />
                    <span>{skill.category.toUpperCase()}</span>
                  </div>
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                  <span className="skill-tools">{skill.tools}</span>
                </article>
              ))}
          </div>
          <p className="skills-footnote">
            <Sparkles size={14} /> And always learning the next thing.
          </p>
        </section>

        <section
          id="projects"
          className="content-section projects-section"
          aria-labelledby="projects-title"
        >
          <div className="section-label">
            <span>04 / SELECTED WORK</span>
            <span className="section-label-right">IDEAS, MADE REAL</span>
          </div>
          <div className="section-heading">
            <h2 id="projects-title">
              Less talk.
              <br />
              <span>More shipped.</span>
            </h2>
            <p className="section-copy">
              A selection of things I've built,
              <br />
              and the problems they helped solve.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <button
                className="project-card"
                key={project.name}
                style={{ "--accent": project.color } as CSSProperties}
                onClick={() => setDetail({ type: "project", item: project })}
                aria-label={`View ${project.name} case study`}
              >
                <ProjectPreview project={project} />
                <div className="project-info">
                  <div className="project-category">
                    <span>{project.category}</span>
                    <span>/{project.number}</span>
                  </div>
                  <h3>
                    {project.name}
                    <ArrowUpRight size={25} strokeWidth={1.4} />
                  </h3>
                  <p>{project.description}</p>
                  <div className="stack-tags">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="content-section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="section-label">
            <span>05 / WHAT'S NEXT</span>
            <span className="section-label-right">
              <span className="status-dot" /> OPEN TO GOOD POSSIBILITIES
            </span>
          </div>
          <div className="contact-grid">
            <div>
              <h2 id="contact-title">
                Our paths
                <br />
                could{" "}
                <span className="contact-connect">
                  connect.
                  <svg viewBox="0 0 290 18" fill="none" aria-hidden="true">
                    <path
                      d="M2 14C71 3 182 0 287 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </h2>
              <p className="section-copy">
                Have a project in mind, an interesting opportunity,
                <br />
                or just a good story? I'd love to hear it.
              </p>
              <div className="contact-email">
                <a href="mailto:hello@alexrivera.dev">
                  hello@alexrivera.dev <ArrowUpRight size={21} />
                </a>
                <button
                  className="icon-button"
                  onClick={copyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  title={copied ? "Copied!" : "Copy email"}
                >
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </button>
              </div>
              <span className="copy-status" role="status">
                {copied
                  ? "EMAIL COPIED TO CLIPBOARD"
                  : copyError
                    ? "Please select and copy the email address above."
                    : "GOOD THINGS START WITH A HELLO."}
              </span>
            </div>
            <form className="contact-form" onSubmit={sendMessage}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    autoComplete="name"
                    name="name"
                    placeholder="Alex, meet..."
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Email address
                  <input
                    type="email"
                    autoComplete="email"
                    name="email"
                    placeholder="you@somewhere.com"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                What's on your mind?
                <textarea
                  name="message"
                  rows={4}
                  placeholder="An idea, a possibility, a hello..."
                  required
                  minLength={10}
                  maxLength={5000}
                />
              </label>
              <button className="contact-submit" type="submit">
                LET'S START A CONVERSATION <ArrowUpRight size={20} />
              </button>
              <p className="form-note">
                OPENS YOUR EMAIL APP. NO MESSAGE IS SENT AUTOMATICALLY.
              </p>
              {formStatus && (
                <p className="form-status" role="status">
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-identity" href="#home">
          <span className="monogram">AR</span>
          <span>&copy; 2026 ALEX RIVERA</span>
        </a>
        <span className="footer-built">
          THOUGHTFULLY BUILT WITH REACT & THREE.JS
        </span>
        <a href="#home" className="back-top">
          BACK TO TOP <ArrowUp size={14} />
        </a>
      </footer>
      <DetailDialog detail={detail} onClose={() => setDetail(null)} />
    </>
  );
}
