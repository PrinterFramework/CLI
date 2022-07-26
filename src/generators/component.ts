import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { Config } from '../config'

export async function generateComponent (path: string) {
  if (exists(join(process.cwd(), path)) || exists(join(process.cwd(), `${path}.tsx`))) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'This component already exists, overwrite it?'
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

  if (Config.componentFolder === true) {
    let component = read(join(__dirname, '..', 'templates', 'component', 'component.nostyle.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path)
    const componentPath = join(process.cwd(), path, `${fileName}.component.tsx`)

    if (Config.component?.style === true) {
      component = read(join(__dirname, '..', 'templates', 'component', 'component.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path)

      const style = read(join(__dirname, '..', 'templates', 'component', 'style.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path)
      const stylePath = join(process.cwd(), path, `${fileName}.style.tsx`)
      write(stylePath, style || '')
      Log(`    ✅  Created ${fileName}.style.tsx`.green)
    }

    write(componentPath, component || '')
    Log(`    ✅  Created ${fileName}.component.tsx`.green)

    if (Config.component?.test) {
      const test = read(join(__dirname, '..', 'templates', 'component', 'test.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path)
      const testPath = join(process.cwd(), path, `${fileName}.test.tsx`)

      write(testPath, test || '')
      Log(`    ✅  Created ${fileName}.test.tsx`.green)
    }

    if (Config.component?.index) {
      let index = read(join(__dirname, '..', 'templates', 'component', 'index.nostyle.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path)
      const indexPath = join(process.cwd(), path, 'index.tsx')

      if (Config.component?.style === true) {
        index = read(join(__dirname, '..', 'templates', 'component', 'index.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path).replaceAll('{{path}}', path)
      }

      write(indexPath, index || '')
      Log('    ✅  Created index.tsx'.green)
    }
  } else {
    const component = read(join(__dirname, '..', 'templates', 'component', 'component.nostyle.template'))?.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path)
    const componentPath = join(process.cwd(), `${path}.tsx`)

    write(componentPath, component || '')
    Log(`    ✅  Created ${path}.tsx`.green)
  }
}
