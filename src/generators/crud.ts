import prompts from 'prompts'
import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

export async function generateCrud (model: string) {
  const basePath = join(process.cwd(), 'pages', 'api', model)

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

  const createPath = join(basePath, 'create.tsx')
  const createTemplate = read(join(__dirname, '..', 'templates', 'crud', 'create.template'))?.replaceAll('{{model}}', model)
  write(createPath, createTemplate || '')
  Log(`    ✅  Created pages/api/${model}/create.tsx`.green)

  const updatePath = join(basePath, 'update.tsx')
  const updateTemplate = read(join(__dirname, '..', 'templates', 'crud', 'update.template'))?.replaceAll('{{model}}', model)
  write(updatePath, updateTemplate || '')
  Log(`    ✅  Created pages/api/${model}/update.tsx`.green)

  const getPath = join(basePath, 'get.tsx')
  const getTemplate = read(join(__dirname, '..', 'templates', 'crud', 'get.template'))?.replaceAll('{{model}}', model)
  write(getPath, getTemplate || '')
  Log(`    ✅  Created pages/api/${model}/get.tsx`.green)

  const listPath = join(basePath, 'list.tsx')
  const listTemplate = read(join(__dirname, '..', 'templates', 'crud', 'list.template'))?.replaceAll('{{model}}', model)
  write(listPath, listTemplate || '')
  Log(`    ✅  Created pages/api/${model}/list.tsx`.green)

  const deletePath = join(basePath, 'delete.tsx')
  const deleteTemplate = read(join(__dirname, '..', 'templates', 'crud', 'delete.template'))?.replaceAll('{{model}}', model)
  write(deletePath, deleteTemplate || '')
  Log(`    ✅  Created pages/api/${model}/delete.tsx`.green)
}
