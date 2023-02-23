import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

export async function generateScss (path: string) {
  const scssPath = join(process.cwd(), 'scss', `${path}.scss`)

  if (exists(scssPath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'This scss file already exists, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const scssTemplate = read(join(__dirname, '..', 'templates', 'scss.template')) || ''
  write(scssPath, scssTemplate)
  Log(`    ✅  Created scss/${path}.scss`.green)

  const printerPath = join(process.cwd(), 'scss', 'printer.scss')
  let printerFile = read(printerPath)
  printerFile += `\n@import "/scss/${path}.scss";`

  write(printerPath, printerFile || '')
  Log('    ✅  Updated scss/printer.scss'.green)
}
