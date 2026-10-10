import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { isMain, readRegularFile, repoRoot, requireDirectory } from './lib.mjs'

export const artifactTypes = [
  'research',
  'benchmark',
  'direction',
  'feedback',
  'review',
  'handoff',
]

export async function createArtifact(root, type) {
  if (!artifactTypes.includes(type)) {
    throw new Error(`Tipo desconocido. Opciones: ${artifactTypes.join(', ')}.`)
  }
  await requireDirectory(join(root, 'project'))
  const source = await readRegularFile(
    join(root, 'harness', 'templates', `${type}.md`),
  )
  const destination = join(root, 'project', `${type}.md`)
  try {
    await writeFile(destination, source, { flag: 'wx' })
  } catch (error) {
    if (error.code === 'EEXIST')
      throw new Error(
        `project/${type}.md ya existe. Editar ese documento; no se sobrescribió.`,
        { cause: error },
      )
    throw error
  }
  return destination
}

if (isMain(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length === 0 || ['--help', '--list'].includes(args[0])) {
    console.log(
      `npm run artifact -- <tipo>\nTipos: ${artifactTypes.join(', ')}`,
    )
  } else {
    try {
      if (args.length !== 1)
        throw new Error('Indicar exactamente un tipo de documento.')
      await createArtifact(repoRoot, args[0])
      console.log(
        `Creado project/${args[0]}.md. Completar su contenido y actualizar project/status.md.`,
      )
    } catch (error) {
      console.error(error.message)
      process.exitCode = 1
    }
  }
}
