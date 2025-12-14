import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/authSlice'
import { docsSlice } from './features/docsSlice'
import { loadingSlice } from './features/overlayLoaderSlice'
import { editorSlice } from './features/editorSlice'
import { logsSlice } from './features/logsSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            docs: docsSlice.reducer,
            loadingSlice: loadingSlice.reducer,
            editorSlice: editorSlice.reducer,
            logsSlice: logsSlice.reducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']