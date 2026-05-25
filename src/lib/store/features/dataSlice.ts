import { createSlice } from '@reduxjs/toolkit'

export interface stateType {
    defaultDoc: any
}

const initialState: stateType = {
    defaultDoc: null
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDefaultSlug: (state, action) => {
            state.defaultDoc = action.payload.defaultDoc
        },
    },
})


export const { setDefaultSlug } = dataSlice.actions

export default dataSlice.reducer