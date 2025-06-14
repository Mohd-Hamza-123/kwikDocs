'use client'
import React from 'react'
import { useTypicalContext } from '@/context/Typical-Context'

const Overlay = () => {
    const { isDocSearchOpen, setIsDocSearchOpen } = useTypicalContext()
    // console.log(isDocSearchOpen)
    if (!isDocSearchOpen) return null;
    return (
        <div
            className='fixed w-screen h-screen min-h-screen opacity-50 bg-gray-200 dark:bg-containerDark z-20 overflow-hidden'
            onClick={() => setIsDocSearchOpen(false)}>
        </div>
    )
}

export default Overlay