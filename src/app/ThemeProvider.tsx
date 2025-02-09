'use client'
import React, { ReactNode } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <NextThemeProvider
            attribute={'class'}
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemeProvider>
    )
}

export default ThemeProvider