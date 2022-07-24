import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

export async function generateType (path: string) {
  const typePath = join(process.cwd(), 'types', `${path}.tsx`)

  if (exists(typePath) !== false) {
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

  const typeTemplate = read(join(__dirname, '..', 'templates', 'type.template'))?.replaceAll('{{name}}', name)

  write(typePath, typeTemplate || '')
  Log(`    ✅  Created types/${path}.tsx`.green)
}
