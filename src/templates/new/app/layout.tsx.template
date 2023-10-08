import 'scss/printer.scss'
import { ReactNode, Suspense } from 'react'
import { ReduxProvider } from 'redux/provider'

export const metadata = {
  title: 'Printer',
  description: 'Automation Tooling for Next, Redux and Prisma'
}

export interface LayoutI {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutI) {
  return (
    <ReduxProvider>
      <Suspense>
        <html lang="en">
          <body>{children}</body>
        </html>
      </Suspense>
    </ReduxProvider>
  )
}
