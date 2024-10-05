'use client'
import React, { useState } from 'react'
import { TypicalContextProvider } from './Typical-Context'

const TypicalContextProviderWrapper = ({ children }: any) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    return (
        <TypicalContextProvider
            value={{
                isSideBarOpen,
                setIsSideBarOpen,
            }}
        >
            {children}
        </TypicalContextProvider>
    )
}

export default TypicalContextProviderWrapper