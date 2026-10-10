import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  isMain,
  parseOptions,
  readRegularFile,
  repoRoot,
  requireDirectory,
} from './lib.mjs'

function projectIdentity(options) {
  const name = options.name?.trim()
  if (
    !name ||
    name.length > 100 ||
    [...name].some(
      (character) =>
        character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
    )
  ) {
    throw new Error(
      'El nombre debe tener entre 1 y 100 caracteres, en una sola línea.',
    )
  }
  const slug =
    options.slug ??
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/gu, '-')
      .replace(/^-|-$/gu, '')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug) || slug.length > 80) {
    throw new Error(
      'Usar un slug de hasta 80 caracteres con letras minúsculas, números y guiones. Podés indicar --slug.',
    )
  }
  if (slug === 'harness-ux-template')
    throw new Error('Elegí un slug diferente al nombre del template.')
  return { name, slug }
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/gu,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  )
}

export async function initProject(root, options) {
  const identity = projectIdentity(options)
  await requireDirectory(join(root, 'project'))
  const paths = [
    'project/project.json',
    'package.json',
    'package-lock.json',
    'index.html',
  ]
  const originals = await Promise.all(
    paths.map((path) => readRegularFile(join(root, path))),
  )
  const metadata = JSON.parse(originals[0])
  const pkg = JSON.parse(originals[1])
  const lock = JSON.parse(originals[2])
  if (
    metadata.schemaVersion !== 1 ||
    metadata.initialized !== false ||
    metadata.slug !== 'harness-ux-template'
  ) {
    throw new Error(
      'Esta copia ya fue inicializada o su metadata cambió. No se sobrescribió ningún archivo.',
    )
  }
  if (
    pkg.name !== metadata.slug ||
    lock.name !== metadata.slug ||
    lock.packages?.['']?.name !== metadata.slug
  ) {
    throw new Error(
      'El package y su lockfile ya fueron personalizados. Revisar el nombre antes de iniciar.',
    )
  }
  if (!originals[3].includes('<title>Design Harness</title>')) {
    throw new Error(
      'El título de index.html ya fue personalizado. No se sobrescribió ningún archivo.',
    )
  }
  const stringify = (value) => `${JSON.stringify(value, null, 2)}\n`
  const updates = [
    stringify({ ...metadata, ...identity, initialized: true }),
    stringify({ ...pkg, name: identity.slug }),
    stringify({
      ...lock,
      name: identity.slug,
      packages: {
        ...lock.packages,
        '': { ...lock.packages[''], name: identity.slug },
      },
    }),
    originals[3].replace(
      '<title>Design Harness</title>',
      () => `<title>${escapeHtml(identity.name)}</title>`,
    ),
  ]
  // Preconditions are checked before any write. Restore completed writes if a later write fails.
  const written = []
  try {
    for (let index = 0; index < paths.length; index += 1) {
      written.push(index)
      await writeFile(join(root, paths[index]), updates[index])
    }
  } catch (error) {
    const rollback = await Promise.allSettled(
      written.map((index) =>
        writeFile(join(root, paths[index]), originals[index]),
      ),
    )
    if (rollback.some((result) => result.status === 'rejected')) {
      throw new Error(
        'La inicialización falló y no pudo restaurar todos los archivos. Revisar metadata, package, lockfile e index.html.',
        { cause: error },
      )
    }
    throw error
  }
  return identity
}

if (isMain(import.meta.url)) {
  if (process.argv.includes('--help')) {
    console.log(
      'npm run project:init -- --name "Nombre del proyecto" [--slug nombre-corto]',
    )
  } else {
    try {
      const result = await initProject(
        repoRoot,
        parseOptions(process.argv.slice(2)),
      )
      console.log(
        `Proyecto iniciado: ${result.name} (${result.slug}).\nEl brief y el historial se conservaron. Abrí el agente y describí el proyecto.`,
      )
    } catch (error) {
      console.error(error.message)
      process.exitCode = 1
    }
  }
}
