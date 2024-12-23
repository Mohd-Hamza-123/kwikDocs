'use client'
import logoutAPI from '@/lib/API/authAPI/logout'
import getProfile from '@/lib/API/authAPI/profile'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { login, logout } from '@/lib/store/features/authSlice'
import React, { useEffect } from 'react'

const InitializationWrapper = ({ children }: any) => {

    const dispatch = useAppDispatch();

    const getUserData = async () => {
        const user = await getProfile();
        if (user) {
            dispatch(login({ userData: user }));
        } else {
            await logoutAPI();
            dispatch(logout());
        }
    }
   

    useEffect(() => {
        getUserData()
       
    }, [logout, login])

    return (<>{children}</>)
}

export default InitializationWrapper