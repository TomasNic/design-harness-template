import { lstat, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const repoRoot = fileURLToPath(new URL('../', import.meta.url))

export function isMain(metaUrl) {
  return Boolean(
    process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === metaUrl,
  )
}

export async function readRegularFile(path) {
  const info = await lstat(path)
  if (!info.isFile() || info.isSymbolicLink()) {
    throw new Error(`Se esperaba un archivo regular: ${path}`)
  }
  return readFile(path, 'utf8')
}

export async function requireDirectory(path) {
  const info = await lstat(path)
  if (!info.isDirectory() || info.isSymbolicLink()) {
    throw new Error(`Se esperaba un directorio real: ${path}`)
  }
}

export function parseOptions(args) {
  const allowed = new Set(['--name', '--slug'])
  const options = {}
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index]
    const value = args[index + 1]
    if (
      !allowed.has(key) ||
      !value ||
      value.startsWith('--') ||
      key.slice(2) in options
    ) {
      throw new Error(
        'Usar --name "Nombre del proyecto" y, opcionalmente, --slug nombre-corto.',
      )
    }
    options[key.slice(2)] = value
  }
  return options
}
