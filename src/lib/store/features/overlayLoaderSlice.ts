import { createSlice } from "@reduxjs/toolkit";

interface ILoadingSlice {
    overlayLoading: Boolean;
    overlayLoadingMsg: string;
}

const initialState: ILoadingSlice = {
    overlayLoading: false,
    overlayLoadingMsg: 'please wait...'
}

export const loadingSlice = createSlice({
    initialState: initialState,
    name: 'loading',
    reducers: {
        overlayLoadingIsTrueReducer: (state, action) => {
            state.overlayLoading = true
            state.overlayLoadingMsg = action.payload.overlayLoadingMsg
        },
        overlayLoadingIsFalseReducer: (state) => {
            state.overlayLoading = false
            state.overlayLoadingMsg = 'please wait...'
        },
    }
})

export const {
    overlayLoadingIsTrueReducer,
    overlayLoadingIsFalseReducer,
} = loadingSlice.actions

export default loadingSlice.reducer