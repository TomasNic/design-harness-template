import { access, readdir, readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { artifactTypes } from './create-artifact.mjs'
import { isMain, repoRoot } from './lib.mjs'

const skillNames = [
  'harness-kickoff',
  'harness-research',
  'harness-benchmark',
  'harness-design',
  'harness-frontend',
  'harness-review',
]

async function markdownFiles(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (
      ['node_modules', 'dist', '.git', '.local', 'coverage'].includes(
        entry.name,
      )
    )
      continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await markdownFiles(path)))
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(path)
  }
  return files
}

export async function checkHarness(root) {
  const errors = []
  const required = [
    'AGENTS.md',
    'README.md',
    'harness/process.md',
    'harness/stack.md',
    'harness/quality.md',
    'project/brief.md',
    'project/status.md',
    'project/decisions.md',
    'project/project.json',
    'package-lock.json',
    ...artifactTypes.map((type) => `harness/templates/${type}.md`),
    ...skillNames.map((name) => `.agents/skills/${name}/SKILL.md`),
  ]
  for (const path of required) {
    try {
      await access(join(root, path))
    } catch {
      errors.push(`Falta ${path}`)
    }
  }
  for (const name of skillNames) {
    try {
      const source = await readFile(
        join(root, '.agents/skills', name, 'SKILL.md'),
        'utf8',
      )
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/u)?.[1]
      if (
        !frontmatter?.includes(`name: ${name}\n`) ||
        !/^description: "[^"\n]+"$/mu.test(frontmatter)
      ) {
        errors.push(`Metadata inválida en ${name}`)
      }
    } catch {
      /* Already reported as a required file. */
    }
  }
  try {
    const metadata = JSON.parse(
      await readFile(join(root, 'project/project.json'), 'utf8'),
    )
    const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
    const lock = JSON.parse(
      await readFile(join(root, 'package-lock.json'), 'utf8'),
    )
    if (
      metadata.schemaVersion !== 1 ||
      typeof metadata.initialized !== 'boolean' ||
      !metadata.name?.trim() ||
      !metadata.templateVersion
    ) {
      errors.push('Metadata del proyecto incompleta o incompatible.')
    }
    if (
      metadata.slug !== pkg.name ||
      lock.name !== pkg.name ||
      lock.packages?.['']?.name !== pkg.name
    ) {
      errors.push(
        'El slug, package.json y package-lock.json deben tener el mismo nombre.',
      )
    }
  } catch (error) {
    errors.push(`No se pudo leer metadata/package/lockfile: ${error.message}`)
  }

  for (const path of await markdownFiles(root)) {
    const source = await readFile(path, 'utf8')
    for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/gu)) {
      const target = match[1]
      if (/^(?:https?:|mailto:|#)/u.test(target)) continue
      const relative = target.split('#')[0]
      try {
        await access(resolve(dirname(path), decodeURIComponent(relative)))
      } catch {
        errors.push(
          `Enlace local roto en ${path.slice(root.length)}: ${target}`,
        )
      }
    }
  }
  return errors
}

if (isMain(import.meta.url)) {
  try {
    const errors = await checkHarness(repoRoot)
    if (errors.length) {
      console.error(errors.join('\n'))
      process.exitCode = 1
    } else
      console.log(
        'Harness íntegro: 6 skills, 6 plantillas, metadata y enlaces locales correctos. No evalúa calidad de diseño ni comportamiento del agente.',
      )
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
