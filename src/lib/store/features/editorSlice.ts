import { Themes } from '@/constant'
import { createSlice } from '@reduxjs/toolkit'

export type ThemeKeys = keyof typeof Themes;

interface EditorState {
    theme: ThemeKeys; 
}

const defaultTheme = localStorage.getItem("editorTheme") || 'monokai'

const initialState: EditorState = {
    theme: defaultTheme as ThemeKeys
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload.theme
        }
    },
})


export const { changeTheme } = editorSlice.actions

export default editorSlice.reducer