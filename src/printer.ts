import 'colors'
import { Command } from 'commander'
import { Log } from './helpers/log'
import { registerConfig } from './config'
import { generateNewProject } from './generators/new'
import { generateComponent } from './generators/component'
import { generateSlice } from './generators/slice'
import { generateType } from './generators/type'
import { generatePage } from './generators/page'
import { generateLayout } from './generators/layout'
import { generateLoading } from './generators/loading'
import { generateError } from './generators/error'
import { generateApi } from './generators/api'
import { generateCrud } from './generators/crud'
import { generateScss } from './generators/scss'
import { inject } from './generators/inject'
import { generatePrismaTypes } from './generators/prisma'
import { SuperagentTypes, injectSupergent } from './generators/superagent'

export const Printer = new Command('🖨️ Printer')

Printer
  .version('2.1.1')
  .description('🖨️ Printer: Automation Tooling for Next, Redux and Prisma.')
  .option('-a, --no-action', 'do not inject actions', false)
  .option('-s, --no-state', 'do not inject state', false)

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
    Log(`💉  Injecting ${slice} into ${component.replaceAll('.tsx', '')}`.green)
    await inject(slice, component, Printer.opts())
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
  .command('layout <path>')
  .description('Generate a new layout component')
  .action(async path => {
    registerConfig()
    Log('👷  Generating new layout component'.green)
    await generateLayout(path)
  })

Printer
  .command('loading <path>')
  .description('Generate a new loading component')
  .action(async path => {
    registerConfig()
    Log('👷  Generating new loading component'.green)
    await generateLoading(path)
  })

Printer
  .command('error <path>')
  .description('Generate a new error component')
  .action(async path => {
    registerConfig()
    Log('👷  Generating new error component'.green)
    await generateError(path)
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
  .command('scss <path>')
  .description('Generate a new Printer SCSS file')
  .action(async path => {
    registerConfig()
    Log('👷  Generating new Printer SCSS file'.green)
    await generateScss(path)
  })

Printer
  .command('superagent <type> <path>')
  .description('Generate a new Superagent request flow')
  .action(async (type, path) => {
    registerConfig()
    Log('👷  Generating new Superagent request flow for'.green, path)
    await injectSupergent(String(type).toUpperCase() as SuperagentTypes, path)
  })

Printer
  .command('prisma')
  .description('Generate dynamic prisma types based on prisma/schema.prisma')
  .action(async () => {
    registerConfig()
    Log('👷  Generating prisma types'.green)
    await generatePrismaTypes()
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
