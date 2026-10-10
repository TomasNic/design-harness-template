import project from '../project/project.json'
import { DemoPanel } from './components/DemoPanel'

const stages = [
  ['Contexto', 'Definir la pregunta.'],
  ['Exploración', 'Investigar y comparar cuando aporte.'],
  ['Dirección', 'Dar forma a la experiencia.'],
  ['Frontend', 'Construir y revisar.'],
]

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <div className="page-shell">
        <header className="site-header">
          <a
            href="#main"
            className="wordmark"
            aria-label="Design Harness, inicio"
          >
            <span className="brand-mark" aria-hidden="true">
              h.
            </span>
            <span>design harness</span>
          </a>
          <span className="project-name">
            {project.initialized ? project.name : 'Un proyecto por empezar'}
            <span className="status-dot" aria-hidden="true" />
          </span>
        </header>
        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                Un punto de partida, muchas posibilidades
              </p>
              <h1 id="hero-title">
                De una idea
                <br />a una <em>experiencia.</em>
              </h1>
              <p className="hero-description">
                El espacio está preparado. El próximo paso es definir qué
                queremos resolver y para quién.
              </p>
              <a className="primary-link" href="#first-step">
                Empezar por el contexto <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="process-note">
              <span className="note-number">01—04</span>
              <p>
                Un proceso que avanza
                <br />
                con cada decisión.
              </p>
              <span className="note-line" aria-hidden="true" />
              <span className="small-label">
                Diseñar / construir / aprender
              </span>
            </div>
          </section>
          <section className="process-strip" aria-label="Recorrido de diseño">
            {stages.map(([title, description], index) => (
              <div className="process-step" key={title}>
                <span className="step-number">0{index + 1}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            ))}
          </section>
          <div className="workspace-grid">
            <section
              id="first-step"
              className="first-step"
              aria-labelledby="first-step-title"
              tabIndex={-1}
            >
              <p className="section-label">01 / El primer paso</p>
              <h2 id="first-step-title">
                Una buena pregunta
                <br />
                ordena lo que sigue.
              </h2>
              <p className="section-description">
                Abrí este proyecto con tu agente y contale qué querés crear. El
                harness te ayuda a convertir esa idea en un brief.
              </p>
              <blockquote>
                “Quiero diseñar una experiencia para…
                <br />
                La van a usar…
                <br />
                Lo más importante es que puedan…”
              </blockquote>
              <p className="footnote">
                El contexto, las decisiones y el próximo paso quedan guardados
                en los documentos del proyecto.
              </p>
            </section>
            <DemoPanel />
          </div>
        </main>
        <footer className="site-footer">
          <span>
            Design Harness{' '}
            <span className="footer-version">/ {project.templateVersion}</span>
          </span>
          <span>Esta vista es un starter. Tu proyecto le da forma.</span>
        </footer>
      </div>
    </>
  )
}
