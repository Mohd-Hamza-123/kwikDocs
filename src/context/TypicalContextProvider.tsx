'use client'
import React, { useState } from 'react'
import { TypicalContextProvider } from './Typical-Context'

const TypicalContextProviderWrapper = ({ children }: any) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const contextValue = {
        isSideBarOpen,
        setIsSideBarOpen,
    };

    return (
        <TypicalContextProvider
            value={contextValue}>
            {children}
        </TypicalContextProvider>
    )
}

export default TypicalContextProviderWrapper