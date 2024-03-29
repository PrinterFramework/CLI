# 🛠️ CHANGELOG

## 2.2.5(-1)

- Updated package.json to Next 14

- Switched to static semantic versioning in package.json

- Updated to iron-session 8.0.1

- Improved and cleaned up api macro

- Updated middleware.tsx session provider

## 2.2.4

- Fix default `layout.tsx` suspense boundary.

- Update default counter slice to reset properly.

## 2.2.3

- Make sure to add `eslint-plugin-n` to `package.json`

- Remove `redux/hooks.tsx` since it's now deprecated in the 13.5.3 to Printer.

## 2.2.2

- Updated `app/layout.tsx` to use suspense boundaries.

- `printer layout` now uses a suspense boundary.

- `printer loading` now uses a suspense boundary.

## 2.2.1

- In `printer new`, forgot to add `components/counter.tsx` to build list.

- Make sure example redux slice `reset()` works as intended with 13.5.3.

## 2.2.0

- Relationships fixed for prisma

- Deprecate experimental decorations

- Update `package.json` versioning

- Fix prisma client management in development

- Fix redux bug with Next.js 13.5.3

## 2.1.2

- Fix `prisma` import definitions to cover all types

## 2.1.1

- Fix for `prisma` circular import definitions

## 2.1.0

- Updated how metadata is handled

- Added 3 new commands

```bash
printer layout [path]
printer loading [path]
printer error [path]
```

These commands behave similar to the `page` command. But instead generate layout, loading and error components for pages.

## v2.0.2

- Ensure API routes have `application/json` header

- Fix `printer prisma` `?` error

## v2.0.1

- Fix injectable formatting issues

## v2.0.0

- Complete refactor to Next App Directories, review new documentation

### Notice

**Printer v1.x.x** is compatible with the old Next patterns. You can review the documentation on the v1 website: [v1.prntr.click/docs](https://v1.prntr.click/docs)

**Printer v2.x.x** leverages the Next App Directory pattern. This will be on the main documentation website: [prntr.click/docs](https://prntr.click/docs)

## v1.3.40

- Hotfix to type inference

## v1.3.3

- Dynamic type inference for prisma type generators

- `path` refactoring to support all formats (`.ts`, `.tsx` and no suffix).

## v1.3.2

- Updates prisma type generation nomenclature (hotfix)

## v1.3.1

- `superagent` command hotfix

## v1.3.0

- Added the `scss` command

- Improved `public/assets/scss` structure and moved files to `/scss`

- Added the `prisma` command

- Added the `superagent` command

- Restructured base project structure

- Component, Pages and Injections now support `.tsx` suffixes

- Added a `README.md` file with command list and documentation reference

- Updated `package.json` dependencies

## v1.2.1

- Added `sass` to dependencies

- Removed `fonts.css` (redundant)

- Moved `css/reset.css` to `scss/reset.scss`

- Updated `printer.scss` structure

## v1.2.0

- Added `--no-state` and `--no-action` flags for the `inject` command.

## v1.1.3

- Made sure single variable injections work properly

- Made sure that injection mapping properly identifies between a single variable, an array and an object

## v1.1.2

- Array Typed injections were patched to use [...] instead of {...} for spread assignment.

## v1.1.1

- Made sure type injections support array namespaces

- Made sure component folder test files inputted paths properly

- Fixed a console error where type injections with no types displayed "null" after output.

- Printer Config is now dynamic and doesn't need to be full to preserve default options.

## v1.1.0

- Made sure component generation checks both types of component structures for overwrite confirmation

- Updated Component namespaces for better formatted code completion

- Made sure that SCSS dynamically reloads with website

- Updated scss command to compile static CSS for SSG/SSR

## v1.0.0

#### Official API starts with the spec

```bash
printer new [path]
printer component <path>
printer type <path>
printer inject <slice component>
printer slice <name>
printer page <path>
printer api <path>
crud <model>
```
