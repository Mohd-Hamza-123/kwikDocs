'use client'

import React, { useEffect } from 'react'
import logoutAPI from '@/lib/API/authAPI/logout'
import { useTypicalContext } from '@/context/Typical-Context'
import getProfile from '@/lib/API/authAPI/profile'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { login, logout } from '@/lib/store/features/authSlice'

const InitializationWrapper = ({ children }: any) => {

    const dispatch = useAppDispatch();
    const { theme, setTheme } = useTypicalContext();
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


    useEffect(() => {
        if (theme === "dark") {
            const htmlElement = document.documentElement;
            htmlElement.classList.remove('light')
            htmlElement.classList.add('dark')
            if ((typeof window)) localStorage.setItem('theme', 'dark');

        } else {
            const htmlElement = document.documentElement;
            htmlElement.classList.remove('dark')
            htmlElement.classList.add('light')
            if ((typeof window)) localStorage.setItem('theme', 'light');
        }
    }, [theme, setTheme])

    return (<>{children}</>)
}

export default InitializationWrapper