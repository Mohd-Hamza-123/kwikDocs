'use client'
import React, { useState } from 'react'
import { TypicalContextProvider } from './Typical-Context'

const TypicalContextProviderWrapper = ({ children }: any) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light');

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