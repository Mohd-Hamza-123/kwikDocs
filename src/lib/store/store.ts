import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/authSlice'
import { docsSlice } from './features/docsSlice'
import { loadingSlice } from './features/overlayLoaderSlice'
import { postSlice } from './features/postSlice'
import { editorSlice } from './features/editorSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            docs: docsSlice.reducer,
            loadingSlice: loadingSlice.reducer,
            post: postSlice.reducer,
            editorSlice: editorSlice.reducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']