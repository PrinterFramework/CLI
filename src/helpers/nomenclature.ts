export function formatName (_fileName: string) {
  const fileName = _fileName.replaceAll('.ts', '').replaceAll('.tsx', '').replaceAll('[', '').replaceAll(']', '')
  let name = fileName

  if (fileName.indexOf('.') !== -1) {
    name = fileName.split('.').map(word => word[0].toUpperCase() + word.substring(1)).join('')
  } else if (fileName.indexOf('-') !== -1) {
    name = fileName.split('-').map(word => word[0].toUpperCase() + word.substring(1)).join('')
  } else {
    name = name[0].toUpperCase() + name.substring(1)
  }

  return name
}
