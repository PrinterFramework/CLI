import { write, remove } from 'fs-jetpack'
import { Printer } from '../src/printer'
import { Log } from '../src/helpers/log'
import { registerConfig } from '../src/config'

test('Printer - Ensure CLI can run', () => {
  expect(typeof Printer.parse).toBe('function')
})

test('Config Registration', () => {
  registerConfig()
  write('printer.config.json', '{}')
  registerConfig()
  remove('printer.config.json')
})

test('Utility - Log Function', () => {
  Log('Log test output')
})
