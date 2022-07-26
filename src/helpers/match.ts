export const SliceMatcher = /^(?=.*export)(?=.*createSlice).*$/gmi
export const ImportMatcher = /^(?=.*import)(?=.*from).*$/gmi
export const ReduxMatcher = /^(?=.*import)(?=.*from)(?=.*useSelector)(?=.*useDispatch).*$/gmi
export const ReduxOptionalMatcher = /^(?=.*import)(?=.*from)(?=.*useSelector|useDispatch).*$/gmi
export const DispatchMatcher = /^(?=.*const)(?=.*dispatch)(?=.*useDispatch).*$/gmi
export const BraceMatcher = /^(?=.*\[).*$/gmi
export const BraceMatcher2 = /^(?=.*{).*$/gmi

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
