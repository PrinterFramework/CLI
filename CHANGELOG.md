# 🛠️ CHANGELOG

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
