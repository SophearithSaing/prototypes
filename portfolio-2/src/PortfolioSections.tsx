import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  MapPin,
  Network,
  Sparkles,
  X,
} from "lucide-react";
import { milestones } from "./data";
import "./portfolio.css";

const email = "hello@alexrivera.dev";

const skillGroups = [
  {
    name: "Interfaces",
    icon: Code2,
    description: "The part people feel.",
    skills: [
      {
        name: "React",
        description:
          "Thoughtful component boundaries, predictable state, and interfaces that stay responsive. I build around the way people use a product, not just the way a design file looks.",
      },
      {
        name: "TypeScript",
        description:
          "Clear contracts between components, services, and people. I use types to make invalid states harder to represent and everyday refactoring less of a leap of faith.",
      },
      {
        name: "CSS & Tailwind",
        description:
          "Fluid layouts, considered typography, and reusable design tokens. I reach for native CSS first and utility classes when they help a team move consistently.",
      },
      {
        name: "Accessibility",
        description:
          "Semantic HTML, visible focus, keyboard navigation, and reduced-motion alternatives are part of the first draft. A beautiful interface should never depend on just one way of using it.",
      },
    ],
  },
  {
    name: "Systems",
    icon: Network,
    description: "The foundations that hold.",
    skills: [
      {
        name: "Node.js",
        description:
          "Focused APIs and background jobs with explicit validation, useful errors, and sensible boundaries. The goal is a service that is as straightforward to operate as it is to extend.",
      },
      {
        name: "PostgreSQL",
        description:
          "Relational models that reflect the real problem, transactions that protect the important parts, and indexes informed by actual query plans rather than guesswork.",
      },
      {
        name: "AWS",
        description:
          "Practical cloud infrastructure with repeatable deployments, least-privilege access, and meaningful monitoring. Reliability matters more to me than collecting services.",
      },
      {
        name: "System design",
        description:
          "Start with the constraints, make the tradeoffs visible, and keep the first version understandable. I design systems that can grow without asking a small team to operate a large-company architecture.",
      },
    ],
  },
  {
    name: "Creative",
    icon: Sparkles,
    description: "A little room for wonder.",
    skills: [
      {
        name: "Three.js",
        description:
          "Spatial interfaces and interactive scenes that give an idea another dimension. I balance lighting, materials, and interaction with a realistic performance budget and a useful fallback.",
      },
      {
        name: "WebGL",
        description:
          "Small shader experiments, procedural textures, and GPU-driven effects. I enjoy understanding the rendering underneath the abstraction, especially when it helps make an experience lighter.",
      },
      {
        name: "Motion design",
        description:
          "Motion that explains a state change, directs attention, or adds a moment of character. Timing and restraint come first, with reduced-motion preferences respected throughout.",
      },
      {
        name: "Figma",
        description:
          "A shared space for exploring flows, testing hierarchy, and connecting design decisions to reusable components. I like to prototype early and keep the conversation close to the code.",
      },
    ],
  },
];

const projects = [
  {
    id: "orbit",
    title: "Orbit Analytics",
    category: "Product engineering / Data",
    year: "2024",
    description: "A clearer picture of what moves a product forward.",
    introduction:
      "An analytics workspace that trades dashboard overload for a few useful answers. A concept exploration in making complex product data feel calm, legible, and actionable.",
    role: "Product design & engineering",
    stack: "React, TypeScript, PostgreSQL",
    sections: [
      {
        title: "The question",
        body: "How do you help a small product team understand what changed without asking them to become data analysts? The starting point was a familiar problem: plenty of charts, fragmented definitions, and very little confidence about which signal deserves attention.",
      },
      {
        title: "The approach",
        body: "Organize the experience around an overview, a comparison, and a path to the underlying events. Shared metric definitions keep each view consistent. Progressive disclosure makes room for deeper analysis without putting every filter on the first screen. Charts are paired with readable summaries and tabular alternatives.",
      },
      {
        title: "The takeaway",
        body: "The concept centers on a reusable visualization language and an explicit data contract between the interface and its queries. The next validation step would be task-based testing with product teams: can they identify a meaningful change and explain it? Clarity, not the number of widgets, is the measure of success.",
      },
    ],
  },
  {
    id: "forma",
    title: "Forma Workspace",
    category: "Collaboration / Systems",
    year: "2025",
    description: "A shared space for good ideas to take shape.",
    introduction:
      "A collaborative workspace concept for teams that think visually. Notes, decisions, and project context live together, without turning every conversation into another notification.",
    role: "Interaction & system design",
    stack: "React, Node.js, WebSockets",
    sections: [
      {
        title: "The question",
        body: "Creative work rarely moves in a straight line, but many project tools assume it does. This exploration asks how a workspace can support the messy middle: collecting references, trying directions, and leaving enough context for someone in another time zone to pick up the thread.",
      },
      {
        title: "The approach",
        body: "Build around small, composable blocks and a clear distinction between live presence and durable project history. Optimistic interactions keep local edits immediate, while visible synchronization states explain what has actually been saved. Keyboard-friendly controls offer an alternative to dragging, and quiet presence cues avoid competing with the work.",
      },
      {
        title: "The takeaway",
        body: "The central design decision is to treat trust as an interface feature. Reconnection, conflicting edits, and permissions need understandable states, not just backend solutions. The concept maps those edge cases alongside the happy path, creating a foundation for a focused collaboration prototype rather than an all-in-one tool.",
      },
    ],
  },
  {
    id: "offgrid",
    title: "Off-grid Studio",
    category: "Creative development / Web",
    year: "2026",
    description: "An independent spirit, expressed on the web.",
    introduction:
      "An editorial website concept for a small creative studio. Expressive typography, earthy color, and a touch of motion make space for the work instead of getting in its way.",
    role: "Art direction & development",
    stack: "React, CSS, motion studies",
    sections: [
      {
        title: "The question",
        body: "Can a studio website feel distinctive without relying on an elaborate loading sequence or a wall of visual effects? The brief for this concept was to balance the personality of a printed art book with the speed and usability people expect from the web.",
      },
      {
        title: "The approach",
        body: "Use a small set of strong ingredients: oversized type, a modular grid, soft natural tones, and generous negative space. CSS-generated compositions establish the visual direction without image downloads. Motion is reserved for feedback and transitions, while the reading order and navigation remain useful with every effect switched off.",
      },
      {
        title: "The takeaway",
        body: "Restraint can be a recognizable visual identity. This study establishes a responsive art direction that works from a narrow phone screen to a wide desktop, with content taking priority over choreography. Further development would focus on real studio work, editorial content, and testing the experience on low-powered devices.",
      },
    ],
  },
];

export default function PortfolioSections() {
  const [selectedSkill, setSelectedSkill] = useState(skillGroups[0].skills[0]);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const projectTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedProject && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedProject]);

  async function copyEmail() {
    setCopyStatus("copying");
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <div className="portfolio-sections">
      <section
        className="portfolio-section portfolio-about"
        id="about"
        aria-labelledby="portfolio-about-title"
      >
        <div className="portfolio-shell">
          <p className="portfolio-eyebrow">
            <span>01</span> A little about me
          </p>
          <div className="portfolio-about-grid">
            <h2 className="portfolio-heading" id="portfolio-about-title">
              A builder at heart.
              <br />
              <span>Curious by default.</span>
            </h2>
            <div className="portfolio-about-copy">
              <p className="portfolio-lead">
                I'm Alex, an engineer drawn to the space where thoughtful design
                meets dependable technology.
              </p>
              <p>
                I turn complex problems into things that feel simple to use.
                Over the past seven years, that's meant building products,
                growing teams, and paying attention to the details that make a
                good experience a great one.
              </p>
              <p>
                At my best, I'm learning something new and making something
                useful. Ideally, at the same time.
              </p>
            </div>
          </div>
          <div className="portfolio-about-bottom">
            <dl className="portfolio-metrics">
              <div>
                <dt>Years of experience</dt>
                <dd>
                  7<span>+</span>
                </dd>
              </div>
              <div>
                <dt>Projects shipped</dt>
                <dd>
                  30<span>+</span>
                </dd>
              </div>
              <div>
                <dt>Curiosity</dt>
                <dd className="portfolio-metric-word">
                  Endless<span>.</span>
                </dd>
              </div>
            </dl>
            <div className="portfolio-availability">
              <p>
                <span className="portfolio-status-dot" /> Open to meaningful
                work
              </p>
              <span>Good people. Interesting problems.</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="portfolio-section"
        id="experience"
        aria-labelledby="portfolio-experience-title"
      >
        <div className="portfolio-shell">
          <p className="portfolio-eyebrow">
            <span>02</span> The journey so far
          </p>
          <div className="portfolio-section-heading">
            <h2 className="portfolio-heading" id="portfolio-experience-title">
              Always moving
              <br />
              <span>forward.</span>
            </h2>
            <p>
              Different teams. Bigger questions.
              <br />
              The same attention to detail.
            </p>
          </div>
          <ol className="portfolio-timeline">
            {milestones
              .slice()
              .reverse()
              .map((milestone, index) => (
                <li className="portfolio-timeline-row" key={milestone.year}>
                  <span
                    className="portfolio-timeline-node"
                    style={{ backgroundColor: milestone.color }}
                    aria-hidden="true"
                  />
                  <div className="portfolio-timeline-period">
                    <p>{milestone.period}</p>
                    {index === 0 && (
                      <span className="portfolio-current">Current chapter</span>
                    )}
                  </div>
                  <div className="portfolio-timeline-role">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.company}</p>
                  </div>
                  <p className="portfolio-timeline-description">
                    {milestone.description}
                  </p>
                </li>
              ))}
          </ol>
        </div>
      </section>

      <section
        className="portfolio-section portfolio-skills"
        id="skills"
        aria-labelledby="portfolio-skills-title"
      >
        <div className="portfolio-shell">
          <p className="portfolio-eyebrow">
            <span>03</span> My toolkit
          </p>
          <div className="portfolio-section-heading">
            <h2 className="portfolio-heading" id="portfolio-skills-title">
              Range, with
              <br />
              <span>a reason.</span>
            </h2>
            <p>
              The right tool is the one that serves the idea.
              <br />
              Select a skill to see how I use it.
            </p>
          </div>
          <div className="portfolio-skill-groups">
            {skillGroups.map((group) => (
              <div
                className="portfolio-skill-group"
                key={group.name}
                role="group"
                aria-labelledby={`portfolio-skills-${group.name.toLowerCase()}`}
              >
                <group.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <h3 id={`portfolio-skills-${group.name.toLowerCase()}`}>
                  {group.name}
                </h3>
                <p>{group.description}</p>
                <div className="portfolio-skill-buttons">
                  {group.skills.map((skill) => (
                    <button
                      type="button"
                      className="portfolio-skill-button"
                      key={skill.name}
                      aria-pressed={selectedSkill.name === skill.name}
                      aria-controls="portfolio-skill-detail"
                      onClick={() => setSelectedSkill(skill)}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="portfolio-skill-detail"
            id="portfolio-skill-detail"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="portfolio-detail-label">
              <ArrowRight size={16} aria-hidden="true" /> In practice
            </span>
            <h3>{selectedSkill.name}</h3>
            <p>{selectedSkill.description}</p>
          </div>
        </div>
      </section>

      <section
        className="portfolio-section"
        id="projects"
        aria-labelledby="portfolio-projects-title"
      >
        <div className="portfolio-shell">
          <p className="portfolio-eyebrow">
            <span>04</span> Selected explorations
          </p>
          <div className="portfolio-section-heading">
            <h2 className="portfolio-heading" id="portfolio-projects-title">
              Ideas, made
              <br />
              <span>tangible.</span>
            </h2>
            <p>
              Three concepts. Three different challenges.
              <br />A little of how I think, design, and build.
            </p>
          </div>
          <div className="portfolio-projects-grid">
            {projects.map((project, index) => (
              <article
                className={`portfolio-project portfolio-project--${project.id}`}
                key={project.id}
              >
                <div className="portfolio-project-preview" aria-hidden="true">
                  {project.id === "orbit" && (
                    <>
                      <div className="portfolio-preview-topline">
                        <span>ORBIT</span>
                        <span>
                          LIVE SIGNAL <i />
                        </span>
                      </div>
                      <div className="portfolio-orbit-rings">
                        <i />
                        <i />
                        <i />
                        <span className="portfolio-orbit-core" />
                        <span className="portfolio-orbit-satellite" />
                      </div>
                      <div className="portfolio-orbit-panel">
                        <span>Activity overview</span>
                        <strong>
                          24.8<span>k</span>
                          <small>+18.6%</small>
                        </strong>
                        <div className="portfolio-orbit-bars">
                          {[
                            24, 36, 30, 48, 40, 61, 55, 76, 68, 92, 83, 100,
                          ].map((height, barIndex) => (
                            <i
                              key={barIndex}
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="portfolio-preview-caption">
                        A new perspective on your data.
                      </span>
                    </>
                  )}
                  {project.id === "forma" && (
                    <>
                      <div className="portfolio-preview-topline">
                        <span>FORMA</span>
                        <span>SPACE TO THINK</span>
                      </div>
                      <div className="portfolio-forma-back" />
                      <div className="portfolio-forma-board">
                        <div className="portfolio-forma-board-heading">
                          <span>The next big thing</span>
                          <span className="portfolio-forma-avatars">
                            <i />
                            <i />
                            <i />
                          </span>
                        </div>
                        <div className="portfolio-forma-columns">
                          <div>
                            <span>Ideas</span>
                            <i />
                            <i />
                          </div>
                          <div>
                            <span>In motion</span>
                            <i />
                            <i />
                          </div>
                          <div>
                            <span>Made real</span>
                            <i />
                          </div>
                        </div>
                      </div>
                      <div className="portfolio-forma-cursor">
                        <i />
                        <span>Alex</span>
                      </div>
                      <span className="portfolio-preview-caption">
                        Good work happens together.
                      </span>
                    </>
                  )}
                  {project.id === "offgrid" && (
                    <>
                      <div className="portfolio-preview-topline">
                        <span>INDEPENDENT STUDIO</span>
                        <span>EST. 2026</span>
                      </div>
                      <div className="portfolio-offgrid-sun" />
                      <div className="portfolio-offgrid-lines">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <strong className="portfolio-offgrid-word">
                        off<span>grid.</span>
                      </strong>
                      <span className="portfolio-preview-caption">
                        A different kind of ordinary.
                      </span>
                      <span className="portfolio-offgrid-asterisk">*</span>
                    </>
                  )}
                </div>
                <div className="portfolio-project-meta">
                  <span>{project.category}</span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="portfolio-project-description">
                  {project.description}
                </p>
                <button
                  className="portfolio-project-link"
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Explore project: ${project.title}`}
                  onClick={(event) => {
                    projectTriggerRef.current = event.currentTarget;
                    setSelectedProject(project);
                  }}
                >
                  Explore project <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="portfolio-section portfolio-contact"
        id="contact"
        aria-labelledby="portfolio-contact-title"
      >
        <div className="portfolio-shell">
          <p className="portfolio-eyebrow">
            <span>05</span> The next chapter
          </p>
          <h2 className="portfolio-heading" id="portfolio-contact-title">
            Have something in mind?
            <br />
            <span>Let's build it.</span>
          </h2>
          <p className="portfolio-contact-description">
            An ambitious idea, an interesting challenge, or just a hello.
            <br />
            I'd love to hear what you're thinking.
          </p>
          <div className="portfolio-email-row">
            <a className="portfolio-email" href={`mailto:${email}`}>
              {email}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <button
              type="button"
              className="portfolio-copy-button"
              aria-label="Copy email address"
              aria-describedby="portfolio-copy-feedback"
              title="Copy email address"
              disabled={copyStatus === "copying"}
              aria-busy={copyStatus === "copying"}
              onClick={copyEmail}
            >
              {copyStatus === "copied" ? (
                <Check size={17} aria-hidden="true" />
              ) : (
                <Copy size={17} aria-hidden="true" />
              )}
            </button>
          </div>
          <p
            className={`portfolio-copy-feedback${copyStatus === "error" ? " portfolio-copy-feedback--error" : ""}`}
            id="portfolio-copy-feedback"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {copyStatus === "copying" && "Copying email address..."}
            {copyStatus === "copied" && "Email copied. Talk soon."}
            {copyStatus === "error" &&
              "Couldn't copy. You can select the address above and copy it manually."}
          </p>
          <div className="portfolio-contact-location">
            <span>
              <MapPin size={15} aria-hidden="true" /> Working worldwide
            </span>
            <span>
              <span className="portfolio-status-dot" /> Remote-friendly
            </span>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <div className="portfolio-shell portfolio-footer-inner">
          <div className="portfolio-footer-identity">
            <a
              className="portfolio-wordmark"
              href="#home"
              aria-label="Alex Rivera, home"
            >
              alex<span>rivera</span>
              <b>.</b>
            </a>
            <span className="portfolio-copyright">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <p>Designed with intention. Built with Three.js.</p>
          <a className="portfolio-back-top" href="#home">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        className="portfolio-dialog"
        aria-labelledby="portfolio-case-title"
        aria-describedby="portfolio-case-introduction"
        onClose={() => {
          setSelectedProject(null);
          projectTriggerRef.current?.focus({ preventScroll: true });
        }}
      >
        {selectedProject && (
          <>
            <button
              className="portfolio-dialog-close"
              type="button"
              autoFocus
              aria-label="Close project case study"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={21} aria-hidden="true" />
            </button>
            <div className="portfolio-case-header">
              <p className="portfolio-eyebrow">
                <span>{selectedProject.year}</span> Concept case study
              </p>
              <h2 id="portfolio-case-title">{selectedProject.title}</h2>
              <p id="portfolio-case-introduction">
                {selectedProject.introduction}
              </p>
            </div>
            <dl className="portfolio-case-facts">
              <div>
                <dt>My focus</dt>
                <dd>{selectedProject.role}</dd>
              </div>
              <div>
                <dt>Proposed toolkit</dt>
                <dd>{selectedProject.stack}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Independent concept</dd>
              </div>
            </dl>
            <div className="portfolio-case-body">
              {selectedProject.sections.map((section, index) => (
                <section className="portfolio-case-section" key={section.title}>
                  <h3>
                    <span>0{index + 1}</span>
                    {section.title}
                  </h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
            <div className="portfolio-case-footer">
              <p>Have a similar challenge?</p>
              <a href={`mailto:${email}`}>
                Let's talk <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
