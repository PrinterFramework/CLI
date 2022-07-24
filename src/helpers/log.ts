export function Log (...output: string[]): void {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...output)
  }
}
