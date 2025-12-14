'use client'
import React, { useState } from 'react'
import { TypicalContextProvider } from './Typical-Context'

const TypicalContextProviderWrapper = ({ children }: React.PropsWithChildren) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isDocSearchOpen, setIsDocSearchOpen] = useState(false)
    const contextValue = {
        isSideBarOpen,
        setIsSideBarOpen,
        isDocSearchOpen,
        setIsDocSearchOpen,
    };

    return (
        <TypicalContextProvider
            value={contextValue}>
            {children}
        </TypicalContextProvider>
    )
}

export default TypicalContextProviderWrapper