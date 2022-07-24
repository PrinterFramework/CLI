import { inspect, write, remove } from 'fs-jetpack'
import { join } from 'path'

import { generateNewProject } from '../src/generators/new'
import { generateComponent } from '../src/generators/component'
import { generatePage } from '../src/generators/page'
import { generateSlice } from '../src/generators/slice'
import { generateApi } from '../src/generators/api'

test('Generator - New Project', async () => {
  const path = join('test', 'temporary')
  await generateNewProject(path)

  expect(inspect(join(path, '.babelrc'))?.type).toBe('file')
  expect(inspect(join(path, '.gitignore'))?.type).toBe('file')
  expect(inspect(join(path, '.gitkeep'))?.type).toBe('file')
  expect(inspect(join(path, 'package.json'))?.type).toBe('file')
  expect(inspect(join(path, 'tsconfig.json'))?.type).toBe('file')
  expect(inspect(join(path, 'pages', '_app.tsx'))?.type).toBe('file')
  expect(inspect(join(path, 'pages', '_document.tsx'))?.type).toBe('file')
  expect(inspect(join(path, 'pages', 'index.tsx'))?.type).toBe('file')
  expect(inspect(join(path, 'public', '.gitkeep'))?.type).toBe('file')
  expect(inspect(join(path, 'tsconfig.json'))?.type).toBe('file')
  expect(inspect(join(path, 'redux', 'wrapper.tsx'))?.type).toBe('file')
  expect(inspect(join(path, 'redux', 'reducer.tsx'))?.type).toBe('file')
  expect(inspect(join(path, 'redux', 'reducers.json'))?.type).toBe('file')

  remove(path)
})

test('Generator - Component', async () => {
  const path = join('test', 'temporary')
  await generateComponent(path)
  expect(inspect(join(`${path}.tsx`))?.type).toBe('file')

  remove(path)
})

test('Generator - Page', async () => {
  const expectedPath = join(process.cwd(), 'pages', 'test.tsx')

  await generatePage('test')
  expect(inspect(expectedPath)?.type).toBe('file')

  remove(join(process.cwd(), 'pages'))
})

test('Generator - Page URL', async () => {
  const expectedPath = join(process.cwd(), 'pages', '[url].tsx')

  await generatePage('[url]')
  expect(inspect(expectedPath)?.type).toBe('file')

  remove(join(process.cwd(), 'pages'))
})

test('Generator - API Route', async () => {
  const expectedPath = join(process.cwd(), 'pages', 'api', 'test.tsx')

  await generateApi('test')
  expect(inspect(expectedPath)?.type).toBe('file')

  remove(join(process.cwd(), 'pages'))
})

test('Generator - Slice', async () => {
  const reducersPath = join(process.cwd(), 'redux', 'reducers.json')
  write(reducersPath, '[]')

  const expectedPath = join(process.cwd(), 'redux', 'slice', 'test.tsx')

  await generateSlice('test')
  expect(inspect(expectedPath)?.type).toBe('file')

  remove(join(process.cwd(), 'redux'))
})
