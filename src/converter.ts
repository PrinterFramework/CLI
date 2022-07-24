import { join } from 'path'
import { write, read, list } from 'fs-jetpack'

export async function Converter () {
  const path = join(__dirname, 'templates')
  RecurseConverter(path)
}

export async function RecurseConverter (path: string) {
  const files = list(path)
  for (const file of files || []) {
    const subpath = join(path, file)
    if (file.indexOf('.template') !== -1) {
      ConvertTemplate(subpath, file)
    } else if (file.indexOf('.') === -1) {
      RecurseConverter(subpath)
    }
  }
}

export async function ConvertTemplate (path: string, filename: string) {
  const writePath = join(process.cwd(), 'docs', 'templates', `${filename}.ts`)
  const data = `export default \`${read(path)?.toString().replaceAll('`', '\\`')}\``
  write(writePath, data)
}

(() => Converter())()
