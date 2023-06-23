import 'scss/printer.scss'
import { ReactNode } from 'react'
import { ReduxProvider } from 'redux/provider'

export interface LayoutI {
  children: ReactNode
}

export default function LayoutComponent({ children }: LayoutI) {
  return (
    <html>
      <head>
        <title>Printer</title>
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
