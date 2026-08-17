import { useRef, useState } from 'react'
import { ResumeScene, type ResumeSceneHandle } from './components/ResumeScene'
import {
  milestones,
  navigation,
  profile,
  skills,
  type ResumeItem,
  validateResumeData,
} from './data/resume'

validateResumeData()

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function MouseIcon() {
  return (
    <svg viewBox="0 0 28 42" aria-hidden="true">
      <rect x="2" y="2" width="24" height="38" rx="12" />
      <path d="M14 8v8" />
    </svg>
  )
}

export default function App() {
  const sceneRef = useRef<ResumeSceneHandle>(null)
  const [selected, setSelected] = useState<ResumeItem | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  function selectItem(id: string | null) {
    if (!id) {
      setSelected(null)
      return
    }

    setSelected(
      milestones.find((milestone) => milestone.id === id) ??
        skills.find((skill) => skill.id === id) ??
        null,
    )
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${profile.name}, home`}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-name">{profile.name}</span>
          <span className="brand-role">{profile.title}</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav id="site-navigation" className={menuOpen ? 'site-nav is-open' : 'site-nav'}>
          {navigation.map((item, index) => (
            <a
              className={index === 0 ? 'is-active' : undefined}
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="work-link" href="#projects">
          View my work <ArrowIcon />
        </a>
      </header>

      <main id="home" className="hero">
        <section className="hero-copy" aria-labelledby="hero-title">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 id="hero-title">
            <span>
              {profile.headlinePrefix} <em>{profile.headlineLead}</em>
            </span>
            <strong>{profile.headlineAccent}</strong>
          </h1>
          <span className="title-rule" aria-hidden="true" />
          <p className="introduction">{profile.introduction}</p>
          <button
            className="explore-button"
            type="button"
            onClick={() => sceneRef.current?.focusFirst()}
          >
            Explore my journey{' '}
            <span>
              <ArrowIcon />
            </span>
          </button>
        </section>

        <section className="scene-region" aria-label="Interactive career circuit board">
          <ResumeScene ref={sceneRef} selectedId={selected?.id ?? null} onSelect={selectItem} />

          <div className="interaction-hint" aria-hidden="true">
            <MouseIcon />
            <p>
              <span>Drag to rotate</span>
              <span>Scroll to zoom</span>
            </p>
          </div>

          <button
            className="reset-view"
            type="button"
            onClick={() => sceneRef.current?.resetView()}
          >
            Reset view
          </button>

          <div className="path-legend" aria-label="Circuit path legend">
            <p>
              <span className="legend-line career" />
              Career path
            </p>
            <p>
              <span className="legend-line skill" />
              Skill path
            </p>
          </div>
        </section>

        <aside
          className={selected ? 'detail-panel is-visible' : 'detail-panel'}
          aria-live="polite"
          aria-hidden={!selected}
        >
          {selected && (
            <>
              <button className="detail-close" type="button" onClick={() => selectItem(null)}>
                <span aria-hidden="true">x</span>
                <span className="sr-only">Close details</span>
              </button>
              <p className="detail-kicker">
                {'year' in selected ? selected.year : selected.category}
              </p>
              <h2>{'role' in selected ? selected.role : selected.name}</h2>
              <p className="detail-meta">
                {'company' in selected ? selected.company : selected.level}
              </p>
              <p>{selected.summary}</p>
            </>
          )}
        </aside>
      </main>

      <div className="vignette" aria-hidden="true" />
    </div>
  )
}
