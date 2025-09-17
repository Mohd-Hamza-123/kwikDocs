'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const Footer = () => {
    
    const visiblePaths = ['/'];
    const pathName = usePathname();
    const [isRender, setIsRender] = useState(true)


    useEffect(() => {
        const isVisible = visiblePaths.some((path) => path === pathName);
        setIsRender(isVisible)
    }, [pathName])


    if (isRender)
        return (
            <footer className="bg-gray-50 mt-10 py-6 dark:bg-gray-900 dark:border-gray-700">
                <div className="container mx-auto text-center text-gray-600 dark:text-gray-300 text-sm">
                    © {new Date().getFullYear()} MyDocs. All rights reserved.
                </div>
            </footer>
        )
}

export default Footer