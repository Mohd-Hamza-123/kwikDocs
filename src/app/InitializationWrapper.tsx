'use client'

import React, { ReactNode } from 'react'
import logoutAPI from '@/lib/API/Auth/logout'
import { useQuery } from '@tanstack/react-query'
import getProfile from '@/lib/API/Auth/profile'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { login, logout } from '@/lib/store/features/authSlice'

const InitializationWrapper = ({ children }: { children: ReactNode }) => {

    const dispatch = useAppDispatch();

    const {
        error,
        isError,
        isPending,
        isSuccess,
        data: userProfile,
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: () => getProfile(),
        staleTime: Infinity
    });

    if (isSuccess) {
        dispatch(login({ userData: userProfile }));
    }

    if (isError) {
        logoutAPI()
            .then(() => dispatch(logout()))
    }


    return (<>{children}</>)
}

export default InitializationWrapper