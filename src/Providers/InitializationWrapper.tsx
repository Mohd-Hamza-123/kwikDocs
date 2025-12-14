'use client'

import useAuth from '@/hooks/use-auth'
import { useAppDispatch } from '@/lib/hooks/hooks'
import React, { ReactNode, useEffect } from 'react'
import { changeTheme } from '@/lib/store/features/editorSlice'

const InitializationWrapper = ({ children }: { children: ReactNode }) => {

    const dispatch = useAppDispatch();
    const { createSession } = useAuth();

    useEffect(() => {
        createSession()
        const EditorTheme = localStorage.getItem("editorTheme") || 'monokai'
        dispatch(changeTheme({ theme: EditorTheme }))
    }, [])

    return (<>{children}</>)
}

export default InitializationWrapper