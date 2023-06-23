import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { formatName } from '../helpers/nomenclature'

export async function generateComponent (path: string) {
  if (exists(join(process.cwd(), path)) || exists(join(process.cwd(), `${path.replace('.tsx', '')}.tsx`))) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'This component already exists, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const pathArray = path.replace('.tsx', '').split('/')
  const fileName = pathArray[pathArray.length - 1]
  const name = formatName(fileName)

  const component = read(join(__dirname, '..', 'templates', 'component', 'component.nostyle.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path)
  const componentPath = join(process.cwd(), `${path.replace('.tsx', '')}.tsx`)

  write(componentPath, component || '')
  Log(`    ✅  Created ${path.replace('.tsx', '')}.tsx`.green)
}
