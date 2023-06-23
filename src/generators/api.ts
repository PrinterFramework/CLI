import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

export async function generateApi (path: string) {
  const apiPath = join(process.cwd(), 'app', 'api', `${path}/route.tsx`)

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

  const apiTemplate = read(join(__dirname, '..', 'templates', 'api.template'))
  write(apiPath, apiTemplate || '')
  Log(`    ✅  Created app/api/${path}/route.tsx`.green)
}
