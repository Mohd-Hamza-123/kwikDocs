'use client'

import { useAppDispatch } from '@/lib/hooks/hooks'
import React, { ReactNode, useEffect } from 'react'
import useCurrentUser from '@/hooks/use-current-user'
import { changeTheme } from '@/lib/store/features/editorSlice'

const InitializationWrapper = ({ children }: { children: ReactNode }) => {

    const dispatch = useAppDispatch();

    useCurrentUser()

    useEffect(() => {
        const editorTheme = localStorage.getItem("editorTheme") || 'monokai'
        dispatch(changeTheme({ theme: editorTheme }))
    }, [])

    return children
}

export default InitializationWrapper