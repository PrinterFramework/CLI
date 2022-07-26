import { read } from 'fs-jetpack'
import { join } from 'path'
import { Log } from './helpers/log'

export interface PrinterConfig {
  componentFolder?: boolean
  component?: {
    index?: boolean
    component?: boolean
    style?: boolean
    test?: boolean
  }
  crud?: {
    create: boolean
    update: boolean
    delete: boolean
    list: boolean
    get: boolean
  }
}

export let Config: PrinterConfig = {
  componentFolder: false,
  component: {
    index: true,
    component: true,
    style: false,
    test: false
  },
  crud: {
    create: true,
    update: true,
    delete: true,
    list: true,
    get: true
  }
}

export function registerConfig () {
  try {
    const config = read(join(process.cwd(), 'printer.config.json')) || ''
    const data = JSON.parse(config)
    Config = Object.assign(Config, { ...data })
  } catch (error) {
    Log('👷  Could not load Printer config'.yellow)
  }
}
