import { createSlice } from '@reduxjs/toolkit'

interface JavaScriptLogs {
    type: string;
    value: string;
}

interface Logs {
    javaScriptLogs: JavaScriptLogs[],
}

const initialState: Logs = {
    javaScriptLogs: [],
}

export const logsSlice = createSlice({
    name: 'logsSlice',
    initialState,
    reducers: {
        addJavaScriptLogs: (state, action) => {
            state.javaScriptLogs = [...state.javaScriptLogs, action.payload.javaScriptLogs]
        },
        clearJavaScriptLogs: (state) => {
            state.javaScriptLogs = []
        }
    },
})

export const { addJavaScriptLogs, clearJavaScriptLogs } = logsSlice.actions

export default logsSlice.reducer