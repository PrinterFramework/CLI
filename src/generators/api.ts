import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

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
  let name = fileName.replace(/[^\w\s]/gi, '')

  if (fileName.indexOf('.') !== -1) {
    name = fileName.split('.').map(word => word[0].toUpperCase() + word.substring(1)).join('')
  } else if (fileName.indexOf('-') !== -1) {
    name = fileName.split('-').map(word => word[0].toUpperCase() + word.substring(1)).join('')
  } else {
    name = name[0].toUpperCase() + name.substring(1)
  }

  const apiTemplate = read(join(__dirname, '..', 'templates', 'api.template'))?.replaceAll('{{name}}', name)

  write(apiPath, apiTemplate || '')
  Log(`    ✅  Created pages/api/${path}.tsx`.green)
}
