import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { formatName } from '../helpers/nomenclature'

export async function generateLoading (path: string) {
  const loadingPath = join(process.cwd(), 'app', `${path.replace('.tsx', '')}/loading.tsx`)

  if (exists(loadingPath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'A loading component already exists, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const pathArray = path.replace('.tsx', '').split('/')
  const fileName = pathArray[pathArray.length - 1]
  const name = formatName(fileName)
  const loadingTemplate = read(join(__dirname, '..', 'templates', 'loading.template'))?.replaceAll('{{name}}', name) || ''

  write(loadingPath, loadingTemplate)
  Log(`    ✅  Created app/${path}/loading.tsx`.green)
}
