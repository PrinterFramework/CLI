export function SliceTemplate (name: string) {
  return `import { createSlice } from "@reduxjs/toolkit";

export const ${name}InitialState = {

}

export const ${name}Slice = createSlice({
    name: '${name}',
    initialState: ${name}InitialState,
    reducers: {

    },
});

export const { } = ${name}Slice.actions;`
}
