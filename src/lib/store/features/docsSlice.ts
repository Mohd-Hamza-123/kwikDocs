import { docsInterface } from '@/models/docs.model'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface I_document {
    document: docsInterface | null
}
const initialState: I_document = {
    document: null
}

export const docsSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setDoc: (state, action) => {
            state.document = action.payload.document;
        },
    },
})

export const { setDoc } = docsSlice.actions

export default docsSlice.reducer
