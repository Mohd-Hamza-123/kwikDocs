import { Themes } from '@/constant'
import { createSlice } from '@reduxjs/toolkit'

export type ThemeKeys = keyof typeof Themes;

interface EditorState {
    theme: ThemeKeys;
    prismTheme: string;
}

const initialState: EditorState = {
    theme: 'monokai',
    prismTheme: 'okaidia',
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        changeTheme: (state, action) => void (state.theme = action.payload.theme),
        changePrismTheme: (state, action) => void (state.prismTheme = action.payload.prismTheme)
    }
})


export const { changeTheme, changePrismTheme } = editorSlice.actions

export default editorSlice.reducer