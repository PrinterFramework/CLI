import 'scss/printer.scss'
import { Metadata } from 'next'
import { ReactNode, Suspense } from 'react'
import { ReduxProvider } from 'redux/provider'

export const metadata: Metadata = {
  title: 'Printer',
  description: 'Automation Tooling for Next, Redux and Prisma'
}

export interface LayoutI {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutI) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Suspense>{children}</Suspense>
        </ReduxProvider>
      </body>
    </html>
  )
}
