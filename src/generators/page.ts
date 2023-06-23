import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { formatName } from '../helpers/nomenclature'

export async function generatePage (path: string) {
  const pagePath = join(process.cwd(), 'pages', `${path.replace('.tsx', '')}.tsx`)

  if (exists(pagePath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'This page already exists, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const pathArray = path.replace('.tsx', '').split('/')
  const fileName = pathArray[pathArray.length - 1]
  let urls = []
  const name = formatName(fileName)
  let pageTemplate = ''

  console.log(name, path)

  if (path.match(/\[(.*?)\]/g)) {
    urls = path.match(/\[(.*?)\]/g) as string[]
    urls = urls.map(url => url.replace(/\[/g, '').replace(/\]/g, ''))
    pageTemplate = read(join(__dirname, '..', 'templates', 'page.url.template'))?.replaceAll('{{name}}', name).replaceAll('{{url}}', urls.join(', ')) || ''
  } else {
    pageTemplate = read(join(__dirname, '..', 'templates', 'page.template'))?.replaceAll('{{name}}', name) || ''
  }

  write(pagePath, pageTemplate)
  Log(`    ✅  Created pages/${path}.tsx`.green)
}
