import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Docs {
    _id: string;
    title: string;
    description: string | undefined;
    image: null | undefined | File;
    category: string | undefined;
    tags: [] | undefined;
}

export interface DocsInterface {
    docsData: Docs[];
}

const initialState: DocsInterface = {
    docsData: [],
}

export const docsSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {
        appendDocs: (state, action: PayloadAction<{ docsData: Docs[] }>) => {
            const arr = [...action.payload.docsData, ...state.docsData];
            const uniqueArray = Array.from(new Map(arr.map(item => [item._id, item])).values());
            state.docsData = uniqueArray;
        },
    },
})

export const { appendDocs } = docsSlice.actions

export default docsSlice.reducer
