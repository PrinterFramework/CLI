import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

export async function generateCrud (model: string) {
  const basePath = join(process.cwd(), 'app', 'api', model)

  if (exists(basePath) !== false) {
    const result = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'Routes already exist in this folder, overwrite it?'
    })

    if (result.overwrite === false) {
      return
    }
  }

  const routePath = join(basePath, 'route.tsx')
  const routeTemplate = read(join(__dirname, '..', 'templates', 'crud.template'))?.replaceAll('{{model}}', model)
  write(routePath, routeTemplate || '')
  Log(`    ✅  Created pages/api/${model}/route.tsx`.green)
}
