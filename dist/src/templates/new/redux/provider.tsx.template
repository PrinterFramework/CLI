'use client'
import { ReactNode } from 'react'
import { reduxStore } from 'redux/store'
import { Provider } from 'react-redux'

export interface ReduxProviderI {
  children: ReactNode
}

export function ReduxProvider({ children }: ReduxProviderI) {
  return <Provider store={reduxStore}>{children}</Provider>
}
