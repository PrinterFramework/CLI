import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { randomBytes } from 'crypto'

export async function generateNewProject (path: string = '.') {
  const configPath = join(process.cwd(), path, 'printer.config.json')
  if (exists(configPath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'A project already exists here, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const root = [
    'printer.config.json',
    '.env.dev.local',
    '.eslintrc.js',
    '.gitignore',
    'middleware.tsx',
    'next.config.js',
    'package.json',
    'README.md',
    'tsconfig.json'
  ]

  for (const item of root) {
    const itemPath = join(process.cwd(), path, item)
    let contents = read(join(__dirname, '..', 'templates', 'new', `${item}.template`)) || ''
    if (item === '.env.dev.local') {
      contents = contents.replaceAll('{{password}}', randomBytes(32).toString('hex'))
    }

    write(
      itemPath,
      contents
    )
    Log(`    ✅  Created ${item}`.green)
  }

  write(
    join(process.cwd(), path, 'public', '.gitkeep'),
    ''
  )

  const sessionPath = join(process.cwd(), path, 'util', 'session.ts')
  let sessionContents = read(join(__dirname, '..', 'templates', 'new', 'util', 'session.ts.template')) || ''
  sessionContents = sessionContents.replaceAll('{{password}}', randomBytes(32).toString('hex'))
  write(
    sessionPath,
    sessionContents
  )
  Log('    ✅  Created util/session.ts'.green)

  const counterTypePath = join(process.cwd(), path, 'types', 'counter.tsx')
  const counterTypeContents = read(join(__dirname, '..', 'templates', 'new', 'types', 'counter.tsx.template')) || ''
  write(
    counterTypePath,
    counterTypeContents
  )
  Log('    ✅  Created types/counter.tsx'.green)

  const scss = [
    'printer.scss',
    'reset.scss',
    'theme.scss',
    'ui.scss',
    'index.scss'
  ]

  for (const item of scss) {
    const itemPath = join(process.cwd(), path, 'scss', item)
    const contents = read(join(__dirname, '..', 'templates', 'new', 'scss', `${item}.template`)) || ''

    write(
      itemPath,
      contents
    )
    Log(`    ✅  Created scss/${item}`.green)
  }

  const prisma = [
    'client.ts',
    'schema.prisma'
  ]

  for (const item of prisma) {
    const itemPath = join(process.cwd(), path, 'prisma', item)
    const contents = read(join(__dirname, '..', 'templates', 'new', 'prisma', `${item}.template`)) || ''

    write(
      itemPath,
      contents
    )
    Log(`    ✅  Created prisma/${item}`.green)
  }

  const redux = [
    'provider.tsx',
    'reducer.tsx',
    'reducers.json',
    'store.tsx'
  ]

  for (const item of redux) {
    const itemPath = join(process.cwd(), path, 'redux', item)
    const contents = read(join(__dirname, '..', 'templates', 'new', 'redux', `${item}.template`)) || ''

    write(
      itemPath,
      contents
    )
    Log(`    ✅  Created redux/${item}`.green)
  }

  const reduxSlicePath = join(process.cwd(), path, 'redux', 'slice', 'counter.tsx')
  const reduxSliceContents = read(join(__dirname, '..', 'templates', 'new', 'redux', 'slice', 'counter.tsx.template')) || ''
  write(
    reduxSlicePath,
    reduxSliceContents
  )
  Log('    ✅  Created redux/slice/counter.tsx'.green)

  const app = [
    'layout.tsx',
    'page.tsx'
  ]

  for (const item of app) {
    const itemPath = join(process.cwd(), path, 'app', item)
    const contents = read(join(__dirname, '..', 'templates', 'new', 'app', `${item}.template`)) || ''

    write(
      itemPath,
      contents
    )
    Log(`    ✅  Created app/${item}`.green)
  }

  const components = [
    'counter.tsx'
  ]

  for (const item of components) {
    const itemPath = join(process.cwd(), path, 'components', item)
    const contents = read(join(__dirname, '..', 'templates', 'new', 'components', `${item}.template`)) || ''

    write(
      itemPath,
      contents
    )
    Log(`    ✅  Created components/${item}`.green)
  }
}
