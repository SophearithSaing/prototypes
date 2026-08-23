import { useRef, useState } from 'react'
import { ResumeScene, type ResumeSceneHandle } from './components/ResumeScene'
import {
  githubPulse,
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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6a9.6 9.6 0 0 0-3 18.7c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.2-4.7-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.4 4.5-4.7 4.8.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A9.6 9.6 0 0 0 12 2.6Z" />
    </svg>
  )
}

function GitHubPulse() {
  return (
    <a
      className="github-pulse"
      href={githubPulse.profileUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${githubPulse.handle}'s GitHub contributions`}
    >
      <span className="pulse-heading">
        <span className="pulse-icon">
          <GitHubIcon />
        </span>
        <span>
          <strong>GitHub pulse</strong>
          <small>{githubPulse.handle}</small>
        </span>
        <span className="pulse-live">Live</span>
      </span>

      <span className="pulse-visual" aria-hidden="true">
        <span className="contribution-grid">
          {githubPulse.activity.map((count, index) => (
            <span
              className="contribution-cell"
              data-level={Math.min(4, Math.ceil(count / 2))}
              key={`${index}-${count}`}
            />
          ))}
        </span>
        <svg className="pulse-wave" viewBox="0 0 224 44" preserveAspectRatio="none">
          <path d="M1 26h51l8-1 7-11 9 25 10-36 10 23h26l7-4 7 7 8-3h79" />
        </svg>
      </span>

      <span className="pulse-stats">
        <span>
          <strong>{githubPulse.totalContributions}</strong> contributions
        </span>
        <span>
          <strong>{githubPulse.currentStreak}</strong> day streak
        </span>
        <ArrowIcon />
      </span>
    </a>
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

          <GitHubPulse />
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
