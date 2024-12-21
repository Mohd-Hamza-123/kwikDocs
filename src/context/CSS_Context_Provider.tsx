'use client'
import React, { useState } from 'react'
import { ResponsiveContextProvider } from './CSS-Context'

const CSS_Context_Provider_Wrapper = ({ children }: any) => {
    const [isDocIndexOpen, setIsDocIndexOpen] = useState(false);
    const [isDocBookmarkOpen, setIsDocBookmarkOpen] = useState(false)
    return (
        <ResponsiveContextProvider
            value={{
                isDocIndexOpen,
                setIsDocIndexOpen,
                isDocBookmarkOpen,
                setIsDocBookmarkOpen,
            }}>
            {children}
        </ResponsiveContextProvider>
    )
}

export default CSS_Context_Provider_Wrapper