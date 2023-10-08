import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CounterType from 'types/counter'

export const counterInitialState = {
  // @printer::inject::counter
  data: {
    value: 0
  } as CounterType
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: counterInitialState,
  reducers: {
    // @printer::inject
    reset: (state) => {
      state.data.value = 0
    },
    // @printer::inject
    increment: (state, action: PayloadAction<number>) => {
      state.data.value += action.payload
    },
    // @printer::inject
    decrement: (state, action: PayloadAction<number>) => {
      state.data.value -= action.payload
    }
  }
})

export const { increment, decrement, reset } = counterSlice.actions
