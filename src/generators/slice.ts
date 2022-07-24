import prompts from 'prompts'
import { join } from 'path'
import { read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

export async function generateSlice (name: string) {
  const slicePath = join(process.cwd(), 'redux', 'slice', `${name}.tsx`)
  const reducerPath = join(process.cwd(), 'redux', 'reducer.tsx')
  const reducersPath = join(process.cwd(), 'redux', 'reducers.json')

  let reducers = []

  try {
    reducers = JSON.parse(read(reducersPath) as string) as string[]

    if (reducers.indexOf(name) !== -1) {
      const result = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: 'This slice already exists, overwrite it?'
      })

      if (result.overwrite === false) {
        return
      }
    }

    if (reducers.indexOf(name) === -1) {
      reducers.push(name)
    }
    write(reducersPath, JSON.stringify(reducers, null, 2))
  } catch (error) {
    Log('    ❗  redux/reducers.json is invalid, please make sure it\'s a JSON Array'.red)
    process.exit()
  }

  write(
    slicePath,
    read(join(__dirname, '..', 'templates', 'slice', 'slice.template'))?.replaceAll('{{name}}', name) || ''
  )
  Log(`    ✅  Created redux/slice/${name}.tsx`.green)
  write(
    reducerPath,
    read(join(__dirname, '..', 'templates', 'slice', 'reducer.template'))
      ?.replaceAll('{{import}}', reducers.map(slice => `import { ${slice}Slice } from 'redux/slice/${slice}'`).join('\n'))
      .replaceAll('{{reducer}}', reducers.map(slice => `  ${slice}: ${slice}Slice.reducer,`).join('\n')) || ''
  )
  Log('    ✅  Updated redux/reducer.tsx'.green)
}
