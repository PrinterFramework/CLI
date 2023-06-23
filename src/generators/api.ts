import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { formatName } from '../helpers/nomenclature'

export async function generateApi (path: string) {
  const apiPath = join(process.cwd(), 'pages', 'api', `${path}.tsx`)

  if (exists(apiPath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'This api already exists, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const pathArray = path.split('/')
  const fileName = pathArray[pathArray.length - 1]
  const name = formatName(fileName)

  const apiTemplate = read(join(__dirname, '..', 'templates', 'api.template'))?.replaceAll('{{name}}', name)

  write(apiPath, apiTemplate || '')
  Log(`    ✅  Created pages/api/${path}.tsx`.green)
}
