import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { formatName } from '../helpers/nomenclature'

export async function generateError (path: string) {
  const errorPath = join(process.cwd(), 'app', `${path.replace('.tsx', '')}/error.tsx`)

  if (exists(errorPath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'A error component already exists, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const pathArray = path.replace('.tsx', '').split('/')
  const fileName = pathArray[pathArray.length - 1]
  const name = formatName(fileName)
  const errorTemplate = read(join(__dirname, '..', 'templates', 'error.template'))?.replaceAll('{{name}}', name) || ''

  write(errorPath, errorTemplate)
  Log(`    ✅  Created app/${path}/error.tsx`.green)
}
