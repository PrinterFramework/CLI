import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { effectMatcher, findMatches, functionMatcher, stateMatcher, superagentMatcher } from '../helpers/match'

export type SuperagentTypes = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export async function injectSupergent (type: SuperagentTypes, component: string) {
  const filePath = join(process.cwd(), component)
  const pathArray = component.split('/')
  const fileName = pathArray[pathArray.length - 1]
  let fileContents = ''

  if (filePath.indexOf('.tsx') === -1) {
    if (exists(filePath) === 'dir') {
      const fileComponentPath = join(process.cwd(), component, `${fileName}.component.tsx`)
      fileContents = read(fileComponentPath) || ''
    } else {
      fileContents = read(`${filePath}.tsx`) || ''
    }
  } else {
    fileContents = read(`${filePath}`) || ''
  }

  if (findMatches(fileContents, stateMatcher()).length === 0) {
    fileContents = 'import { useState } from \'react\'' + '\n' + fileContents
  }

  if (findMatches(fileContents, effectMatcher()).length === 0) {
    fileContents = 'import { useEffect } from \'react\'' + '\n' + fileContents
  }

  if (findMatches(fileContents, superagentMatcher(type)).length === 0) {
    fileContents = `import { ${type.toLowerCase()} } from 'superagent'` + '\n' + fileContents
  }

  const injectionLine = findMatches(fileContents, functionMatcher(fileName.replaceAll('.tsx', '')))[0]
  const tempContents = fileContents.split('\n')

  const superAgentFlow = read(join(__dirname, '..', 'templates', 'superagent.template'))?.replaceAll('{{type}}', type.toLowerCase()) || ''

  tempContents[injectionLine] += '\n' + superAgentFlow + '\n'
  const newContents = tempContents.join('\n')

  if (exists(filePath) === 'dir') {
    const fileComponentPath = join(process.cwd(), component, `${fileName}.component.tsx`)
    write(fileComponentPath, newContents)
    Log(`    ✅  Updated ${fileComponentPath}`.green)
  } else {
    write(`${component.replace('.tsx', '')}.tsx`, newContents)
    Log(`    ✅  Updated ${component.replace('.tsx', '')}.tsx`.green)
  }
}
