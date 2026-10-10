import { useEffect, useState } from 'react'
import { getExamples } from '../services/examples'
import type { DemoMode, ExampleState } from '../types/demo'

const modes: { value: DemoMode; label: string }[] = [
  { value: 'data', label: 'Con datos' },
  { value: 'empty', label: 'Vacío' },
  { value: 'error', label: 'Error' },
]

export function DemoPanel() {
  const [request, setRequest] = useState({
    mode: 'data' as DemoMode,
    attempt: 0,
  })
  const [result, setResult] = useState<ExampleState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    getExamples(request.mode, controller.signal).then(
      (items) => {
        if (!controller.signal.aborted) setResult({ status: 'success', items })
      },
      (error: unknown) => {
        if (!controller.signal.aborted)
          setResult({
            status: 'error',
            message:
              error instanceof Error
                ? error.message
                : 'Ocurrió un error inesperado.',
          })
      },
    )
    return () => controller.abort()
  }, [request])

  function load(mode: DemoMode) {
    setResult({ status: 'loading' })
    setRequest((previous) => ({ mode, attempt: previous.attempt + 1 }))
  }

  const announcement =
    result.status === 'loading'
      ? 'Cargando ejemplos.'
      : result.status === 'error'
        ? result.message
        : result.items.length
          ? `${result.items.length} ejemplos disponibles.`
          : 'No hay ejemplos para mostrar.'

  return (
    <section className="demo-panel" aria-labelledby="demo-title">
      <div className="section-label">
        <span>02 / Una base que responde</span>
        <span className="pill">Demo</span>
      </div>
      <h2 id="demo-title">
        Los estados también
        <br />
        son parte del diseño.
      </h2>
      <p className="section-description">
        Explorá una respuesta con datos, una lista vacía o un error. Todo usa
        datos de ejemplo.
      </p>
      <div
        className="scenario-controls"
        role="group"
        aria-label="Escenario de datos"
      >
        {modes.map((mode) => (
          <button
            key={mode.value}
            type="button"
            aria-pressed={request.mode === mode.value}
            onClick={() => load(mode.value)}
          >
            {mode.label}
          </button>
        ))}
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
      <div className="demo-content" aria-busy={result.status === 'loading'}>
        {result.status === 'loading' && (
          <div className="state-message">
            <span className="loading-mark" aria-hidden="true" />
            <h3>Cargando ejemplos…</h3>
            <p>Preparando la siguiente vista.</p>
          </div>
        )}
        {result.status === 'error' && (
          <div className="state-message">
            <span className="state-symbol" aria-hidden="true">
              !
            </span>
            <h3>{result.message}</h3>
            <p>Este error es simulado. Podés recuperar la vista con datos.</p>
            <button
              className="text-button"
              type="button"
              onClick={() => load('data')}
            >
              Volver a cargar <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
        {result.status === 'success' && result.items.length === 0 && (
          <div className="state-message">
            <span className="state-symbol" aria-hidden="true">
              —
            </span>
            <h3>Un espacio por completar.</h3>
            <p>La lista está vacía. Cuando haya contenido, aparecerá acá.</p>
            <button
              className="text-button"
              type="button"
              onClick={() => load('data')}
            >
              Mostrar ejemplos <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
        {result.status === 'success' && result.items.length > 0 && (
          <ol className="example-list">
            {result.items.map((item, index) => (
              <li key={item.id}>
                <span className="item-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="item-dot" aria-hidden="true" />
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="demo-footer">
        <span>Servicio simulado · sin persistencia</span>
        <button
          type="button"
          className="text-button"
          onClick={() => load(request.mode)}
        >
          Recargar <span aria-hidden="true">↻</span>
        </button>
      </div>
    </section>
  )
}
