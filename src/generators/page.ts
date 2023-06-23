import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { formatName } from '../helpers/nomenclature'

export async function generatePage (path: string) {
  const pagePath = join(process.cwd(), 'app', `${path.replace('.tsx', '')}/page.tsx`)

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

  if (path.match(/\[(.*?)\]/g)) {
    urls = path.match(/\[(.*?)\]/g) as string[]
    urls = urls.map(url => url.replace(/\[/g, '').replace(/\]/g, ''))

    const urlInterface = urls.map((url) => `${url}: string`)

    pageTemplate = (read(join(__dirname, '..', 'templates', 'page.url.template')) || '')
      .replaceAll('{{name}}', name)
      .replaceAll('{{url_variables}}', 'params')
      .replaceAll('{{url_interface}}', `params: {\n    ${urlInterface.join('\n')}\n  }`)
  } else {
    pageTemplate = read(join(__dirname, '..', 'templates', 'page.template'))?.replaceAll('{{name}}', name) || ''
  }

  write(pagePath, pageTemplate)
  Log(`    ✅  Created app/${path}/page.tsx`.green)
}
