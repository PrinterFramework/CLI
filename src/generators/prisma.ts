import { join } from 'path'
import { read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

interface ModelType {
  original: string
  name: string
  type: string
  imported: boolean
}

interface TypeMatches {
  matches: string[]
  type: string
}

const typeMatches = [
  {
    type: 'number',
    matches: ['INT', 'TINYINT', 'SMALLINT', 'BIGINT', 'FLOAT', 'DOUBLE', 'DECIMAL']
  },
  {
    type: 'string',
    matches: ['STRING', 'CHAR', 'VARCHAR', 'TEXT']
  },
  {
    type: 'Date',
    matches: ['DATE', 'DATETIME', 'TIMESTAMP']
  }
] as TypeMatches[]

function formatModel (models: ModelType[]): ModelType[] {
  const formattedModels = [] as ModelType[]
  const names = models.map((item) => item.name.toUpperCase())

  for (const model of models) {
    const type = model.type.toUpperCase().trim().replaceAll('?', '')
    const tm = type.replaceAll('[]', '')
    let imported = false
    let newType = 'any'

    for (const typeMatch of typeMatches) {
      if (typeMatch.matches.indexOf(tm) !== -1) {
        newType = typeMatch.type
      }
    }

    if (newType === 'any' && names.includes(model.name.toUpperCase())) {
      for (const model of models) {
        if (type === model.type.toUpperCase().trim()) {
          newType = (model.type[0].toUpperCase() + model.type.substring(1) + 'Type').replaceAll('[', '').replaceAll(']', '')
          imported = true
        }
      }
    }

    let inputType = newType
    if (type.indexOf('[]') !== -1) {
      inputType += '[]'
    }
    formattedModels.push({
      original: model.type,
      name: model.name,
      type: inputType,
      imported
    })
  }

  return formattedModels
}

export function generateImports (models: ModelType[]): string {
  let output = ''
  let hasImports = false
  for (const model of models) {
    if (model.imported) {
      const name = (model.original[0].toUpperCase() + model.original.substring(1)).replaceAll('[', '').replaceAll(']', '')
      output += `import ${name}Type from 'types/prisma/${name}'\n`
      hasImports = true
    }
  }
  if (hasImports) {
    output += '\n'
  }
  return output
}

export async function generatePrismaTypes () {
  const prismaPath = join(process.cwd(), 'prisma', 'schema.prisma')
  const prismaFile = read(prismaPath) || ''

  const matches = [...prismaFile.matchAll(/^.*model.*$/gim)]

  for (const match of matches) {
    if (match[0].indexOf('{') !== -1) {
      const models = [] as ModelType[]

      const index = match.index
      const data = prismaFile.slice(index, prismaFile.length)
      let name = ''

      const match2 = [...data.matchAll(/\}/gim)]
      if (match2) {
        const indexEnd = match2[0].index
        const modelContent = data.slice(0, indexEnd).split('{')[1].trim()
        name = data.slice(0, indexEnd).split('{')[0].replace('model', '').trim()
        const lines = modelContent.split('\n').filter((line) => line.indexOf('@@') === -1)

        for (const line of lines) {
          const lineFmt = line.trim()
          const tokens = lineFmt.split(' ')

          const tokenFmt = tokens.filter((token) => token !== '')
          const name = (tokenFmt[0] || '')
          const type = (tokenFmt[1] || '').toLowerCase()

          if (name && type) {
            models.push({ original: type, name, type, imported: false })
          }
        }
      }

      const dataMap = formatModel(models)
      const importMap = generateImports(dataMap)

      let typeFile = '{{imports}}' + `export interface ${name}Type {{{injection}}}` + '\n\n' + `export default ${name}Type` + '\n'
      let typeInject = ''

      for (const item of dataMap) {
        typeInject += '\t' + item.name + '?: ' + item.type + '\n'
      }

      typeFile = typeFile.replace('{{injection}}', '\n' + typeInject)
      typeFile = typeFile.replace('{{imports}}', importMap)
      const typePath = join(process.cwd(), 'types', 'prisma', `${name}.tsx`)

      Log(`    ✅  Generated types/prisma/${name}.tsx`.green)
      write(typePath, typeFile || '')
    }
  }
}
