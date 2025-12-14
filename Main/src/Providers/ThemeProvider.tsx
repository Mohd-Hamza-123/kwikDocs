'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import LoadingPage from '@/components/Spinner/LoadingPage'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), [])

    if (!mounted) return <LoadingPage/>

    return (
        <NextThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme={false}>
            {children}
        </NextThemeProvider>
    )
}

export default ThemeProvider