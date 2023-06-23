export const SliceMatcher = /^(?=.*export)(?=.*createSlice).*$/gmi
export const ImportMatcher = /^(?=.*import)(?=.*from).*$/gmi
export const ReduxMatcher = /^(?=.*import)(?=.*from)(?=.*useAppSelector)(?=.*useAppDispatch).*$/gmi
export const ReduxOptionalMatcher = /^(?=.*import)(?=.*from)(?=.*useAppSelector|useAppDispatch).*$/gmi
export const DispatchMatcher = /^(?=.*const)(?=.*dispatch)(?=.*useAppDispatch).*$/gmi
export const BraceMatcher = /^(?=.*\[).*$/gmi
export const BraceMatcher2 = /^(?=.*{).*$/gmi

export function superagentMatcher (type: string) {
  return new RegExp(`^(?=.*import)(?=.*${type})(?=.*from).*$`, 'gmi')
}

export function stateMatcher () {
  return new RegExp('^(?=.*import)(?=.*useState)(?=.*from).*$', 'gmi')
}

export function effectMatcher () {
  return new RegExp('^(?=.*import)(?=.*useEffect)(?=.*from).*$', 'gmi')
}

export function functionMatcher (name: string) {
  return new RegExp(`^(?=.*function)(?=.*${name}).*$`, 'gmi')
}

export function selectorMatcher (name: string) {
  return new RegExp(`^(?=.*${name} =)(?=.*useSelector).*$`, 'gmi')
}

export function actionMatcher (name: string[]) {
  return new RegExp(`^(?=.*import)(?=.*${name.join('|')})(?=.*from).*$`, 'gmi')
}

export function typeMatcher (name: string) {
  return new RegExp(`^(?=.*import)(?=.*${name})(?=.*from).*$`, 'gmi')
}

export function findMatches (text: any, pattern: any) {
  const matchingLines = []
  const allLines = text.split('\n')

  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i].match(pattern)) {
      matchingLines.push(i)
    }
  }

  return matchingLines
}
