import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Check,
  ChevronRight,
  ChevronsRight,
  Infinity as InfinityIcon,
  Menu,
  Pause,
  Play,
  X,
} from "lucide-react";
import { milestones, navigation, sceneSkills } from "./data";
import PortfolioSections from "./PortfolioSections";

const CareerScene = lazy(() => import("./CareerScene"));
type Selection = { type: "milestone" | "skill"; index: number } | null;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selection, setSelection] = useState<Selection>(null);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sections = navigation.map((name) =>
      document.getElementById(name.toLowerCase()),
    );
    let frame = 0;
    function updateSection() {
      frame = 0;
      const marker = Math.max(112, window.innerHeight * 0.25);
      let current = "home";
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= marker)
          current = section.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      )
        current = sections.at(-1)?.id ?? current;
      setActiveSection(current);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(updateSection);
    }
    updateSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (selection && dialogRef.current && !dialogRef.current.open)
      dialogRef.current.showModal();
  }, [selection]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPaused(preference.matches);
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    function closeMenu(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  function select(type: "milestone" | "skill", index: number) {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelection({ type, index });
  }

  const milestone =
    selection?.type === "milestone" ? milestones[selection.index] : null;
  const skill =
    selection?.type === "skill" ? sceneSkills[selection.index] : null;

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to portfolio content
      </a>
      <header className="site-header">
        <a
          className="identity"
          href="#home"
          aria-label="Alex Rivera, home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="monogram">AR</span>
          <span className="identity-name">Alex Rivera</span>
          <span className="identity-role">Software Engineer</span>
        </a>
        <nav
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {navigation.map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              className={
                activeSection === name.toLowerCase() ? "is-active" : ""
              }
              aria-current={
                activeSection === name.toLowerCase() ? "location" : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </a>
          ))}
          <span className="mobile-nav-note">
            <i /> Open to meaningful work
          </span>
        </nav>
        <a href="#projects" className="work-link">
          View my work <ChevronsRight size={17} strokeWidth={1.4} />
        </a>
        <button
          type="button"
          className="menu-toggle"
          ref={menuButtonRef}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="eyebrow-mark">
                <i />
                <i />
                <i />
              </span>{" "}
              Three.js powered resume
            </p>
            <h1 id="hero-heading">
              My <span className="career-word">career.</span>
              <br />
              <span className="visualized-word">Visualized.</span>
            </h1>
            <span className="hero-rule" aria-hidden="true" />
            <p className="hero-description">
              An interactive 3D map of my journey,
              <br className="desktop-break" /> skills, and growth. Connecting
              the dots
              <br className="desktop-break" /> between curiosity and
              possibility.
            </p>
            <button
              className="explore-button"
              type="button"
              onClick={() => select("milestone", 0)}
            >
              Explore my journey{" "}
              <span>
                <ArrowRight size={16} />
              </span>
            </button>
            <div className="hero-availability">
              <span /> Always learning. Always building.
            </div>
          </div>

          <div className="scene-coordinate" aria-hidden="true">
            <span className="coordinate-cross">+</span>
            <span>CAREER CONSTELLATION</span>
            <span className="coordinate-number">001 / &infin;</span>
          </div>

          <Suspense
            fallback={
              <div className="scene-loading">
                <span />
                Connecting the dots...
              </div>
            }
          >
            <CareerScene
              onMilestoneSelect={(index) => select("milestone", index)}
              onSkillSelect={(index) => select("skill", index)}
              paused={paused}
            />
          </Suspense>

          <div className="hero-bottom">
            <div className="orbit-instructions">
              <span className="mouse-icon">
                <i />
              </span>
              <div>
                <span className="desktop-instruction">Drag to orbit</span>
                <span className="mobile-instruction">Swipe to orbit</span>
                <span className="desktop-instruction">Scroll to zoom</span>
                <span className="mobile-instruction">Tap to explore</span>
              </div>
              <span className="instruction-corner" />
            </div>
            <a className="scroll-discover" href="#about">
              <span>A little more about me</span>
              <ArrowDown size={15} strokeWidth={1.4} />
            </a>
            <div className="scene-legend">
              <div>
                <i className="career-line" />
                <span>Career path</span>
              </div>
              <div>
                <i className="skill-line" />
                <span>Skill connection</span>
              </div>
              <button
                type="button"
                className="motion-toggle"
                onClick={() => setPaused(!paused)}
                aria-label={
                  paused ? "Play scene animation" : "Pause scene animation"
                }
                title={paused ? "Play animation" : "Pause animation"}
              >
                {paused ? <Play size={12} /> : <Pause size={12} />}
              </button>
            </div>
          </div>
          <div className="hero-footnote" aria-hidden="true">
            <span>BUILT ON CURIOSITY</span>
            <span>SCROLL FOR THE HUMAN BEHIND THE CODE</span>
            <span>EST. 2019</span>
          </div>
        </section>
        <PortfolioSections />
      </main>

      <dialog
        className="chapter-dialog"
        ref={dialogRef}
        aria-labelledby="chapter-title"
        onClose={() => {
          setSelection(null);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        style={
          {
            "--chapter-color": milestone?.color ?? skill?.color ?? "#00e5ee",
          } as React.CSSProperties
        }
      >
        <button
          className="chapter-close"
          type="button"
          aria-label="Close career details"
          autoFocus
          onClick={() => dialogRef.current?.close()}
        >
          <X size={19} />
        </button>
        {milestone && selection && (
          <>
            <p className="chapter-eyebrow">
              <span className="chapter-dot" /> Chapter 0{selection.index + 1}{" "}
              <span className="chapter-eyebrow-line" /> {milestone.period}
            </p>
            <span className="chapter-year">{milestone.year}</span>
            <h2 id="chapter-title">{milestone.title}</h2>
            <p className="chapter-company">
              {milestone.company}
              <ArrowUpRight size={15} />
            </p>
            <p className="chapter-description">{milestone.description}</p>
            <p className="chapter-section-label">The highlights</p>
            <ul className="chapter-achievements">
              {milestone.achievements.map((achievement) => (
                <li key={achievement}>
                  <Check size={14} />
                  {achievement}
                </li>
              ))}
            </ul>
            <div className="chapter-tags">
              {milestone.skills.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <div className="chapter-navigation">
              <button
                type="button"
                aria-label="Previous career chapter"
                disabled={selection.index === 0}
                onClick={() =>
                  setSelection({
                    type: "milestone",
                    index: selection.index - 1,
                  })
                }
              >
                <ArrowLeft size={16} />
              </button>
              <div className="chapter-dots">
                {milestones.map((item, index) => (
                  <button
                    type="button"
                    className={index === selection.index ? "is-selected" : ""}
                    aria-label={`Go to ${item.year} chapter`}
                    aria-pressed={index === selection.index}
                    onClick={() => setSelection({ type: "milestone", index })}
                    key={item.year}
                  />
                ))}
              </div>
              {selection.index < milestones.length - 1 ? (
                <button
                  type="button"
                  className="next-chapter"
                  onClick={() =>
                    setSelection({
                      type: "milestone",
                      index: selection.index + 1,
                    })
                  }
                >
                  Next chapter <ArrowRight size={16} />
                </button>
              ) : (
                <a
                  href="#contact"
                  className="next-chapter"
                  onClick={() => dialogRef.current?.close()}
                >
                  What's next? <ArrowRight size={16} />
                </a>
              )}
            </div>
          </>
        )}
        {skill && (
          <>
            <p className="chapter-eyebrow">
              <span className="chapter-dot" /> A connection in the constellation
            </p>
            <div className="skill-dialog-symbol" aria-hidden="true">
              {skill.name === "React" ? (
                <Atom size={34} strokeWidth={1.2} />
              ) : skill.name === "TypeScript" ? (
                "TS"
              ) : skill.name === "Node.js" ? (
                "JS"
              ) : skill.name === "CI/CD" ? (
                <InfinityIcon size={34} strokeWidth={1.2} />
              ) : (
                "< / >"
              )}
            </div>
            <h2 id="chapter-title">{skill.name}</h2>
            <p className="skill-since">{skill.since}</p>
            <p className="chapter-description">{skill.description}</p>
            <button
              className="skill-chapter-link"
              type="button"
              onClick={() =>
                setSelection({ type: "milestone", index: skill.milestone })
              }
            >
              <span>
                See it in my journey
                <strong>{milestones[skill.milestone].title}</strong>
              </span>
              <ChevronRight size={20} />
            </button>
            <a
              className="all-skills-link"
              href="#skills"
              onClick={() => dialogRef.current?.close()}
            >
              Explore my full toolkit <ArrowUpRight size={16} />
            </a>
          </>
        )}
      </dialog>
    </>
  );
}
