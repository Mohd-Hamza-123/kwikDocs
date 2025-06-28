import { Themes } from '@/constant'
import { createSlice } from '@reduxjs/toolkit'

export type ThemeKeys = keyof typeof Themes;

interface EditorState {
    theme: ThemeKeys;
}

const initialState: EditorState = {
    theme: 'monokai'
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        changeTheme: (state, action) => void (state.theme = action.payload.theme),
    },
})


export const { changeTheme } = editorSlice.actions

export default editorSlice.reducer