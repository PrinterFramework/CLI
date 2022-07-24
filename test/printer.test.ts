import { Printer } from '../src/printer'

test('Printer - Basic sanity check', () => {
  expect(typeof Printer.parse).toBe('function')
})
