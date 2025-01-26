'use client'
import React, { useEffect, useState } from 'react'
import { TypicalContextProvider } from './Typical-Context'

const TypicalContextProviderWrapper = ({ children }: any) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | 'dark'>("light");


    useEffect(() => {
        const x = localStorage.getItem("theme")
        if (x) {
            setTheme(x as 'light' | 'dark')
        }
    }, [])

    const contextValue = {
        isSideBarOpen,
        setIsSideBarOpen,
        theme,
        setTheme,
    };

    return (
        <TypicalContextProvider
            value={contextValue}>
            {children}
        </TypicalContextProvider>
    )
}

export default TypicalContextProviderWrapper