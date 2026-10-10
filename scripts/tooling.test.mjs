import assert from 'node:assert/strict'
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import test from 'node:test'
import { createArtifact } from './create-artifact.mjs'
import { initProject } from './init-project.mjs'
import { checkHarness } from './check-harness.mjs'
import { parseOptions, repoRoot } from './lib.mjs'

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'harness-tools-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(join(root, 'project'))
  await mkdir(join(root, 'harness/templates'), { recursive: true })
  await writeFile(
    join(root, 'project/project.json'),
    JSON.stringify({
      schemaVersion: 1,
      templateVersion: '0.1.0',
      initialized: false,
      name: 'Nuevo proyecto',
      slug: 'harness-ux-template',
    }),
  )
  await writeFile(
    join(root, 'package.json'),
    JSON.stringify({
      name: 'harness-ux-template',
      private: true,
      scripts: { dev: 'vite' },
    }),
  )
  await writeFile(
    join(root, 'package-lock.json'),
    JSON.stringify({
      name: 'harness-ux-template',
      lockfileVersion: 3,
      packages: {
        '': { name: 'harness-ux-template' },
        'node_modules/example': { version: '1.0.0', integrity: 'preserved' },
      },
    }),
  )
  await writeFile(
    join(root, 'index.html'),
    '<html><head><title>Design Harness</title></head><body>Contenido existente</body></html>',
  )
  await writeFile(
    join(root, 'project/brief.md'),
    'Brief escrito por una persona. Conservar.',
  )
  for (const type of ['benchmark', 'direction', 'review', 'handoff']) {
    await cp(
      join(repoRoot, 'harness/templates', `${type}.md`),
      join(root, 'harness/templates', `${type}.md`),
    )
  }
  return root
}

async function snapshot(root) {
  return Promise.all(
    [
      'project/project.json',
      'package.json',
      'package-lock.json',
      'index.html',
      'project/brief.md',
    ].map((path) => readFile(join(root, path), 'utf8')),
  )
}

test('initialization personalizes a copy, preserves user work and dependency resolutions', async (t) => {
  const root = await fixture(t)
  const before = await snapshot(root)
  assert.deepEqual(await initProject(root, { name: 'Órbita & <equipo>' }), {
    name: 'Órbita & <equipo>',
    slug: 'orbita-equipo',
  })
  const after = await snapshot(root)
  assert.equal(JSON.parse(after[0]).initialized, true)
  assert.equal(JSON.parse(after[1]).name, 'orbita-equipo')
  assert.equal(JSON.parse(after[2]).packages[''].name, 'orbita-equipo')
  assert.deepEqual(
    JSON.parse(after[2]).packages['node_modules/example'],
    JSON.parse(before[2]).packages['node_modules/example'],
  )
  assert.match(after[3], /<title>Órbita &amp; &lt;equipo&gt;<\/title>/u)
  assert.match(after[3], /Contenido existente/u)
  assert.equal(after[4], before[4])
  await assert.rejects(
    initProject(root, { name: 'Otra cosa' }),
    /ya fue inicializada/u,
  )
  assert.deepEqual(await snapshot(root), after)
})

test('invalid identity cannot write files or escape the project', async (t) => {
  const root = await fixture(t)
  const before = await snapshot(root)
  for (const options of [
    { name: ' ' },
    { name: 'Uno\nDos' },
    { name: 'X', slug: '../outside' },
    { name: 'X', slug: '$(touch surprise)' },
  ]) {
    await assert.rejects(initProject(root, options))
    assert.deepEqual(await snapshot(root), before)
  }
  assert.throws(
    () => parseOptions(['--name', 'Proyecto', '--force']),
    /Usar --name/u,
  )
  assert.throws(
    () => parseOptions(['--name', 'Uno', '--name', 'Dos']),
    /Usar --name/u,
  )
})

test('manual customization is detected before initialization writes', async (t) => {
  const root = await fixture(t)
  await writeFile(join(root, 'index.html'), '<title>Mi título</title>')
  const before = await snapshot(root)
  await assert.rejects(
    initProject(root, { name: 'Proyecto' }),
    /ya fue personalizado/u,
  )
  assert.deepEqual(await snapshot(root), before)
})

test('documents are created on demand and existing work is never overwritten', async (t) => {
  const root = await fixture(t)
  const destination = await createArtifact(root, 'benchmark')
  assert.equal(
    await readFile(destination, 'utf8'),
    await readFile(join(repoRoot, 'harness/templates/benchmark.md'), 'utf8'),
  )
  await writeFile(destination, 'Observaciones reales que deben conservarse.')
  await assert.rejects(createArtifact(root, 'benchmark'), /ya existe/u)
  assert.equal(
    await readFile(destination, 'utf8'),
    'Observaciones reales que deben conservarse.',
  )
  await assert.rejects(createArtifact(root, '../outside'), /Tipo desconocido/u)
})

test('skipping benchmarking does not require creating an empty report', async (t) => {
  const root = await fixture(t)
  await initProject(root, { name: 'Formulario con diseño existente' })
  await createArtifact(root, 'direction')
  await createArtifact(root, 'review')
  await createArtifact(root, 'handoff')
  await assert.rejects(readFile(join(root, 'project/benchmark.md')), {
    code: 'ENOENT',
  })
})

test('benchmarking can be added to an initialized project without resetting its context', async (t) => {
  const root = await fixture(t)
  await initProject(root, { name: 'Comparar un flujo de reservas' })
  const before = await snapshot(root)
  await createArtifact(root, 'benchmark')
  await createArtifact(root, 'direction')
  assert.deepEqual(await snapshot(root), before)
})

test('a symlinked project directory is refused', async (t) => {
  const root = await fixture(t)
  const outside = await mkdtemp(join(tmpdir(), 'harness-outside-'))
  t.after(() => rm(outside, { recursive: true, force: true }))
  await rm(join(root, 'project'), { recursive: true })
  await symlink(outside, join(root, 'project'), 'dir')
  await assert.rejects(createArtifact(root, 'benchmark'), /directorio real/u)
  await assert.rejects(
    initProject(root, { name: 'Proyecto' }),
    /directorio real/u,
  )
})

test('integrity checks work in a copy and identify a broken reference and missing skill', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'harness-integrity-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await cp(repoRoot, root, {
    recursive: true,
    filter: (path) =>
      !['node_modules', '.git', 'dist', '.local', 'coverage'].includes(
        basename(path),
      ),
  })
  assert.deepEqual(await checkHarness(root), [])
  await writeFile(
    join(root, 'project/broken.md'),
    '[Fuente faltante](./missing-source.md)',
  )
  await rm(join(root, '.agents/skills/harness-benchmark/SKILL.md'))
  const errors = await checkHarness(root)
  assert.ok(errors.some((error) => error.includes('missing-source.md')))
  assert.ok(
    errors.some((error) =>
      error.includes('Falta .agents/skills/harness-benchmark/SKILL.md'),
    ),
  )
})
