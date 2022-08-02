import { join } from 'path'
import { exists, read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'
import { findMatches, DispatchMatcher, SliceMatcher, ReduxOptionalMatcher, functionMatcher, selectorMatcher, actionMatcher, typeMatcher, BraceMatcher, BraceMatcher2 } from '../helpers/match'

export async function inject (slice: string, component: string) {
  const filePath = join(process.cwd(), component)
  const pathArray = component.split('/')
  const fileName = pathArray[pathArray.length - 1]
  let fileContents = ''

  if (exists(filePath) === 'dir') {
    const fileComponentPath = join(process.cwd(), component, `${fileName}.component.tsx`)
    fileContents = read(fileComponentPath) || ''
  } else {
    fileContents = read(`${filePath}.tsx`) || ''
  }

  const slicePath = join(process.cwd(), 'redux', 'slice', `${slice}.tsx`)
  const sliceContents = read(slicePath) || ''

  const matches = findMatches(sliceContents, /@printer/gmi)
  const splitFile = sliceContents.split('\n')
  const sliceMatch = findMatches(sliceContents, SliceMatcher)[0]

  let newContents = fileContents
  const stateInjections = []
  const actionInjections = []

  for (let i = 0; i < matches.length; i++) {
    const index = matches[i]
    const match = splitFile[index + 1]

    const decorator = splitFile[index].trim().split('::')

    let typeMap = ''

    if (decorator.length > 2) {
      typeMap = decorator[2]
    }

    if (index < sliceMatch) {
      const varKey = match.split(':')[0].trim()
      const addDots = findMatches(match, BraceMatcher).length > 0 || findMatches(match, BraceMatcher2).length > 0
      stateInjections.push({ value: varKey, type: typeMap, addDots })
    } else {
      const varKey = match.split('(')[0].trim()
      actionInjections.push(varKey)
    }
  }

  if (stateInjections.length === 0 && actionInjections.length === 0) {
    Log('    ⚠️  No printer decorators were found in the slice'.yellow)
    return
  }

  const hasExistingImport = findMatches(newContents, ReduxOptionalMatcher)

  if (hasExistingImport.length > 0) {
    newContents = newContents.replace(ReduxOptionalMatcher, 'import { useSelector, useDispatch } from \'react-redux\'')
  } else {
    newContents = `import { useSelector, useDispatch } from 'react-redux'\n\n${newContents}`
  }

  for (let i = 0; i < stateInjections.length; i++) {
    const stateInjection = stateInjections[i]

    if (stateInjection.type) {
      let typeName = `${stateInjection.type[0].toUpperCase() + stateInjection.type.substring(1)}Type`
      if (typeName.indexOf('[]') !== -1) {
        typeName = typeName.replaceAll('[]', '')
      }
      if (findMatches(newContents, typeMatcher(typeName)).length === 0) {
        newContents = `import ${typeName} from 'types/${stateInjection.type.replaceAll('[]', '')}'\n${newContents}`
      }
    }
  }

  for (let i = 0; i < stateInjections.length; i++) {
    const stateInjection = stateInjections[i]
    if (findMatches(newContents, selectorMatcher(stateInjection.value)).length === 0) {
      const injectionLine = findMatches(newContents, functionMatcher(fileName))[0]
      const tempContents = newContents.split('\n')

      let typeMap = 'any'
      let value = stateInjection.value
      let spreadLeft = '{'
      let spreadRight = '}'

      if (stateInjection.type) {
        let typeName = stateInjection.type[0].toUpperCase() + stateInjection.type.substring(1) + 'Type'
        if (typeName.indexOf('[]') !== -1) {
          typeName = typeName.replaceAll('[]', '') + '[]'
          value = value.replaceAll('[]', '')
          spreadLeft = '['
          spreadRight = ']'
        }
        typeMap = `{ ${slice}: { ${value}: ${typeName} } }`
      }

      tempContents[injectionLine] = tempContents[injectionLine] + `\n  const ${value} = useSelector((state: ${typeMap}) => ${stateInjection.addDots ? '(' + spreadLeft + ' ' : ''}${stateInjection.addDots ? '...' : ''}state.${slice}.${value}${stateInjection.addDots ? ' ' + spreadRight + ')' : ''})`

      if (i === 0) {
        tempContents[injectionLine] = tempContents[injectionLine] + '\n'
      }

      newContents = tempContents.join('\n')
    }

    Log(`    ✅  State '${stateInjection.value}' was injected into the component ${stateInjection.type ? `with the type ${stateInjection.type}` : ''}`.green)
  }

  if (actionInjections.length > 0) {
    if (findMatches(newContents, DispatchMatcher).length === 0) {
      const injectionLine = findMatches(newContents, functionMatcher(fileName))[0]
      const tempContents = newContents.split('\n')
      tempContents[injectionLine] = tempContents[injectionLine] + '\n  const dispatch = useDispatch()'
      newContents = tempContents.join('\n')
    }

    if (findMatches(newContents, actionMatcher(actionInjections)).length > 0) {
      newContents = newContents.replace(actionMatcher(actionInjections), `import { ${actionInjections.join(', ')} } from 'redux/slice/${slice}'`)
    } else {
      const tempContents = newContents.split('\n')
      tempContents[0] = tempContents[0] + `\nimport { ${actionInjections.join(', ')} } from 'redux/slice/${slice}'`
      newContents = tempContents.join('\n')
    }

    Log(`    ✅  ${actionInjections.length} action${actionInjections.length > 1 ? 's were' : ' was'} injected into the component`.green)
  }

  if (exists(filePath) === 'dir') {
    const fileComponentPath = join(process.cwd(), component, `${fileName}.component.tsx`)
    write(fileComponentPath, newContents)
  } else {
    write(`${filePath}.tsx`, newContents)
  }
}
