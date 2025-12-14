
import { DocumentType } from '@/types/docs.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface I_document {
    document: DocumentType | null,
    allDocuments : DocumentType[] | []
}

const initialState: I_document = {
    document: null,
    allDocuments : []
}

export const docsSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setDoc: (state, action) => {
            state.document = action.payload.document
        },
        setAllDocs: (state,action)=>{
            state.allDocuments = action.payload.allDocuments
        }
    },
})

export const { setDoc,setAllDocs } = docsSlice.actions

export default docsSlice.reducer
