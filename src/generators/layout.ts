import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { formatName } from '../helpers/nomenclature'

export async function generateLayout (path: string) {
  const layoutPath = join(process.cwd(), 'app', `${path.replace('.tsx', '')}/layout.tsx`)

  if (exists(layoutPath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'A layout component already exists, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const pathArray = path.replace('.tsx', '').split('/')
  const fileName = pathArray[pathArray.length - 1]
  const name = formatName(fileName)
  const layoutTemplate = read(join(__dirname, '..', 'templates', 'layout.template'))?.replaceAll('{{name}}', name) || ''

  write(layoutPath, layoutTemplate)
  Log(`    ✅  Created app/${path}/layout.tsx`.green)
}
