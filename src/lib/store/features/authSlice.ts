import { IUser } from '@/models/user.model'
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    userStatus: boolean,
    userData: null | IUser,
}

const initialState: CounterState = {
    userStatus: false,
    userData: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData
            state.userStatus = true
        },
        logout: (state) => {
            state.userData = null
            state.userStatus = false
        }
    },
})


export const { login, logout } = authSlice.actions

export default authSlice.reducer