import { read, write } from 'fs-jetpack'
import { join } from 'path'

const file = read(join('dist', 'src', 'printer.js'))
const prependedFile = '#!/usr/bin/env node\n\n' + file

write(join('dist', 'src', 'printer.js'), prependedFile)
