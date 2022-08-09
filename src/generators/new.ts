import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { randomBytes } from 'crypto'

export async function generateNewProject (path: string = '.') {
  const appPath = join(process.cwd(), path, 'pages', '_app.tsx')
  const documentPath = join(process.cwd(), path, 'pages', '_document.tsx')
  const babelPath = join(process.cwd(), path, '.babelrc')
  const gitignorePath = join(process.cwd(), path, '.gitignore')
  const gitkeepPath = join(process.cwd(), path, '.gitkeep')
  const gitkeepPublicPath = join(process.cwd(), path, 'public', '.gitkeep')
  const indexPath = join(process.cwd(), path, 'pages', 'index.tsx')
  const utilSessionPath = join(process.cwd(), path, 'util', 'session.ts')
  const resetCssPath = join(process.cwd(), path, 'public', 'assets', 'scss', 'reset.scss')
  const printerCssPath = join(process.cwd(), path, 'public', 'assets', 'css', 'printer.css')
  const printerScssPath = join(process.cwd(), path, 'public', 'assets', 'scss', 'printer.scss')
  const prismaClientPath = join(process.cwd(), path, 'prisma', 'client.ts')
  const prismaSchemaPath = join(process.cwd(), path, 'prisma', 'schema.prisma')
  const packagePath = join(process.cwd(), path, 'package.json')
  const wrapperPath = join(process.cwd(), path, 'redux', 'wrapper.tsx')
  const reducerPath = join(process.cwd(), path, 'redux', 'reducer.tsx')
  const reducersPath = join(process.cwd(), path, 'redux', 'reducers.json')
  const tsconfigPath = join(process.cwd(), path, 'tsconfig.json')
  const precommitPath = join(process.cwd(), path, '.husky', 'pre-commit')
  const eslintrcPath = join(process.cwd(), path, '.eslintrc.js')
  const printerConfigPath = join(process.cwd(), path, 'printer.config.json')

  if (exists(printerConfigPath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'A project already exists here, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  write(
    babelPath,
    read(join(__dirname, '..', 'templates', 'new', 'babelrc.template')) || ''
  )
  Log('    ✅  Created .babelrc'.green)
  write(
    gitignorePath,
    read(join(__dirname, '..', 'templates', 'new', 'gitignore.template')) || ''
  )
  Log('    ✅  Created .gitignore'.green)
  write(gitkeepPath, '')
  Log('    ✅  Created .gitkeep'.green)
  write(gitkeepPublicPath, '')
  Log('    ✅  Created public/.gitkeep'.green)
  write(
    appPath,
    read(join(__dirname, '..', 'templates', 'new', '_app.template')) || ''
  )
  Log('    ✅  Created pages/_app.tsx'.green)
  write(
    documentPath,
    read(join(__dirname, '..', 'templates', 'new', '_document.template')) || ''
  )
  Log('    ✅  Created pages/_document.tsx'.green)
  write(
    indexPath,
    read(join(__dirname, '..', 'templates', 'new', 'index.template')) || ''
  )
  Log('    ✅  Created pages/index.tsx'.green)
  write(
    utilSessionPath,
    read(join(__dirname, '..', 'templates', 'new', 'session.template'))?.replaceAll('{{password}}', randomBytes(32).toString('hex')) || ''
  )
  Log('    ✅  Created util/session.ts'.green)
  write(
    resetCssPath,
    read(join(__dirname, '..', 'templates', 'new', 'reset.template')) || ''
  )
  Log('    ✅  Created public/assets/css/reset.css'.green)
  write(
    printerCssPath,
    ''
  )
  Log('    ✅  Created public/assets/css/printer.css'.green)
  write(
    printerScssPath,
    read(join(__dirname, '..', 'templates', 'new', 'printer.template')) || ''
  )
  Log('    ✅  Created public/assets/scss/printer.scss'.green)
  write(
    prismaClientPath,
    read(join(__dirname, '..', 'templates', 'new', 'prisma.client.template')) || ''
  )
  Log('    ✅  Created prisma/client.ts'.green)
  write(
    prismaSchemaPath,
    read(join(__dirname, '..', 'templates', 'new', 'schema.prisma.template')) || ''
  )
  Log('    ✅  Created prisma/schema.prisma'.green)
  write(
    packagePath,
    read(join(__dirname, '..', 'templates', 'new', 'package.template')) || ''
  )
  Log('    ✅  Created package.json'.green)
  write(
    wrapperPath,
    read(join(__dirname, '..', 'templates', 'new', 'wrapper.template')) || ''
  )
  Log('    ✅  Created redux/wrapper.tsx'.green)
  write(
    reducerPath,
    read(join(__dirname, '..', 'templates', 'new', 'reducer.template')) || ''
  )
  Log('    ✅  Created redux/reducer.tsx'.green)
  write(reducersPath, '[]')
  Log('    ✅  Created redux/reducers.json'.green)
  write(
    tsconfigPath,
    read(join(__dirname, '..', 'templates', 'new', 'tsconfig.template')) || ''
  )
  Log('    ✅  Created tsconfig.json'.green)
  write(
    precommitPath,
    read(join(__dirname, '..', 'templates', 'new', 'precommit.template')) || ''
  )
  Log('    ✅  Created .husky/pre-commit'.green)
  write(
    eslintrcPath,
    read(join(__dirname, '..', 'templates', 'new', 'eslintrc.template')) || ''
  )
  Log('    ✅  Created printer.config.json'.green)
  write(
    printerConfigPath,
    read(join(__dirname, '..', 'templates', 'new', 'printer.config.template')) || ''
  )
  Log('    ✅  Created .eslintrc.js'.green)
}
