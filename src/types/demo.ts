export type DemoMode = 'data' | 'empty' | 'error'

export interface Example {
  id: string
  title: string
  description: string
}

export type ExampleState =
  | { status: 'loading' }
  | { status: 'success'; items: Example[] }
  | { status: 'error'; message: string }
