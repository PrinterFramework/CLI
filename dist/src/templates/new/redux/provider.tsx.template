'use client'
import { ReactNode } from 'react'
import { store } from 'redux/store'
import { Provider } from 'react-redux'

export interface ReduxProviderI {
  children: ReactNode
}

export function ReduxProvider({ children }: ReduxProviderI) {
  return <Provider store={store}>{children}</Provider>
}
