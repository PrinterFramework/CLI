import { join } from 'path'
import { read, write } from 'fs-jetpack'
import { Log } from '../helpers/log'

interface ModelType {
  name: string
  type: string
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

  for (const model of models) {
    const type = model.type.toUpperCase().trim()
    const tm = type.replaceAll('[]', '')
    let newType = 'any'

    for (const typeMatch of typeMatches) {
      if (typeMatch.matches.indexOf(tm) !== -1) {
        newType = typeMatch.type
      }
    }

    let inputType = newType
    if (type.indexOf('[]') !== -1) {
      inputType += '[]'
    }
    formattedModels.push({
      name: model.name,
      type: inputType
    })
  }

  return formattedModels
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
            models.push({ name, type })
          }
        }
      }

      const dataMap = formatModel(models)
      let typeFile = `export interface ${name}Type {{{injection}}}` + '\n\n' + `export default ${name}Type` + '\n'
      let typeInject = ''

      for (const item of dataMap) {
        typeInject += '\t' + item.name + '?: ' + item.type + '\n'
      }

      typeFile = typeFile.replace('{{injection}}', '\n' + typeInject)
      const typePath = join(process.cwd(), 'types', 'prisma', `${name}.tsx`)

      Log(`    ✅  Generated types/prisma/${name}.tsx`.green)
      write(typePath, typeFile || '')
    }
  }
}
