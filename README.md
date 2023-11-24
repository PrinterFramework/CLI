# 🖨️ Printer

![Printer Banner](./banner.jpg "Printer Banner")

## Automation Tooling for Next, Redux and Prisma

![license](https://img.shields.io/badge/license-AGPLv3-blue.svg)
![version](https://img.shields.io/badge/version-2.2.5-blue.svg)
[![CircleCI](https://circleci.com/gh/PrinterFramework/CLI.svg?style=svg)](https://circleci.com/gh/PrinterFramework/CLI)

**Printer v1.x.x** is compatible with the old Next patterns. You can review the documentation on the v1 website: [v1.prntr.click/docs](https://v1.prntr.click/docs)

**Printer v2.x.x** leverages the Next App Directory pattern. This will be on the main documentation website: [prntr.click/docs](https://prntr.click/docs)

Review the [CHANGELOG](./CHANGELOG.md) for any updates made to the project.

## How it works

1. Install printer:

```bash
# npm
npm install -g @printerframework/cli
# yarn
yarn global add @printerframework/cli
```

2. Create a new project:

```bash
printer new printer-sample
cd printer-sample
```

3. Start developing:

```bash
# Create a new component
printer component components/component
```

## Comments and Feedback

Very open to comments and feedback. Very welcoming to people who open issues with reasonable constructive feedback. Please do not open PRs unless you're willing to commit code that matches the conventions and styles of the repository.

## Licensing

[AGPLv3](./LICENSE) - This applies to hard forking printer. Not to Next.js projects generated with Printer.
