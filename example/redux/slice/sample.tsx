import { createSlice } from '@reduxjs/toolkit'
import SampleType from 'types/sample'

export const sampleInitialState = {
  // @printer::inject::sample
  data: {
    value1: 'hello',
    value2: 'world'
  } as SampleType
}

export const sampleSlice = createSlice({
  name: 'sample',
  initialState: sampleInitialState,
  reducers: {
    // @printer::inject
    setData(state, action) {
      state.data = action.payload
    }
  }
})

export const { setData } = sampleSlice.actions
