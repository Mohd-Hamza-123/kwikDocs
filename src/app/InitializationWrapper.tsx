'use client'

import React, { ReactNode, useEffect } from 'react'
import logoutAPI from '@/lib/API/Auth/logout'
import { useQuery } from '@tanstack/react-query'
import getProfile from '@/lib/API/Auth/profile'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { login, logout } from '@/lib/store/features/authSlice'
import { changeTheme } from '@/lib/store/features/editorSlice'

const InitializationWrapper = ({ children }: { children: ReactNode }) => {

    const dispatch = useAppDispatch();

    // const {
    //     error,
    //     isError,
    //     isPending,
    //     isSuccess,
    //     data: userProfile,
    // } = useQuery({
    //     queryKey: ["userProfile"],
    //     queryFn: () => getProfile(),
    //     staleTime: Infinity
    // });

    // if (isSuccess) {
    //     dispatch(login({ userData: userProfile }));
    // }

    // if (isError) {
    //     logoutAPI()
    //         .then(() => dispatch(logout()))
    // }

    useEffect(() => {
        const EditorTheme = localStorage.getItem("editorTheme") || 'monokai'
        dispatch(changeTheme({ theme: EditorTheme }))
    }, [])

    return (<>{children}</>)
}

export default InitializationWrapper