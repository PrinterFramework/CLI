import 'colors'
import { Command } from 'commander'
import { Log } from './helpers/log'
import { registerConfig } from './config'
import { generateNewProject } from './generators/new'
import { generateComponent } from './generators/component'
import { generateSlice } from './generators/slice'
import { generateType } from './generators/type'
import { generatePage } from './generators/page'
import { generateApi } from './generators/api'
import { generateCrud } from './generators/crud'
import { inject } from './generators/inject'

export const Printer = new Command('🖨️ Printer')

Printer
  .version('1.1.2')
  .description('🖨️ Printer: Automation Tooling for Next, Redux and Prisma.')

Printer
  .command('new [path]')
  .description('Generate a new Printer project')
  .action(async path => {
    registerConfig()
    Log('👷  Generating new Printer project'.green)
    await generateNewProject(path || '.')
  })

Printer
  .command('component <path>')
  .description('Generate a new Printer component')
  .action(async path => {
    registerConfig()
    Log(`👷  Generating new Printer component ${path}`.green)
    await generateComponent(path)
  })

Printer
  .command('type <path>')
  .description('Generate a new Printer type')
  .action(async path => {
    registerConfig()
    Log(`👷  Generating new Printer type ${path}`.green)
    await generateType(path)
  })

Printer
  .command('inject <slice> <component>')
  .description('Inject a slice into a component or page')
  .action(async (slice, component) => {
    registerConfig()
    Log(`💉  Injecting ${slice} into ${component}`.green)
    await inject(slice, component)
  })

Printer
  .command('slice <name>')
  .description('Generate a new Printer slice')
  .action(async name => {
    registerConfig()
    Log(`👷  Generating new Printer slice ${name}`.green)
    await generateSlice(name)
  })

Printer
  .command('page <path>')
  .description('Generate a new Printer page')
  .action(async path => {
    registerConfig()
    Log('👷  Generating new Printer page'.green)
    await generatePage(path)
  })

Printer
  .command('api <path>')
  .description('Generate a new Printer API route')
  .action(async path => {
    registerConfig()
    Log('👷  Generating new Printer API route'.green)
    await generateApi(path)
  })

Printer
  .command('crud <model>')
  .description('Generate a CRUD boilerplate for a Prisma model')
  .action(async model => {
    registerConfig()
    Log(`👷  Generating new CRUD boilerplate for ${model}`.green)
    await generateCrud(model)
  })

if (process.env.NODE_ENV !== 'test') {
  Printer.parse(process.argv)
}
