import { examples } from '../data/examples'
import type { DemoMode, Example } from '../types/demo'

// Replace this adapter with a real service while preserving its contract.
// This demonstration has no persistence and performs no network requests.
export async function getExamples(
  mode: DemoMode,
  signal: AbortSignal,
): Promise<Example[]> {
  await new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Solicitud cancelada', 'AbortError'))
      return
    }
    const onAbort = () => {
      clearTimeout(timer)
      reject(new DOMException('Solicitud cancelada', 'AbortError'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }, 450)
    signal.addEventListener('abort', onAbort, { once: true })
  })
  if (mode === 'error') throw new Error('No pudimos cargar los ejemplos.')
  return mode === 'empty' ? [] : examples.map((example) => ({ ...example }))
}
