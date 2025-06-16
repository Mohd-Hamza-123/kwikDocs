'use client'
import { svgIcons } from './icons';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Footer = () => {

    const visiblePaths = ['/'];
    const pathName = usePathname();
    const [isRender, setIsRender] = useState(true)


    useEffect(() => {
        const isVisible = visiblePaths.some((path) => path === pathName);
        setIsRender(isVisible)
    }, [pathName, isRender, visiblePaths])


    if (!isRender) return null;
    
    if (isRender)
        return (
            <footer className="dark:bg-bgDark">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <hr className="my-5 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-md text-gray-500 sm:text-center dark:text-gray-400">&copy; {new Date().getFullYear()} <strong>Kwik Docs </strong>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4">

                            <svgIcons.github
                                className="w-7 h-7 text-gray-500 hover:text-gray-900 dark:fill-white cursor-pointer"
                            />
                            <svgIcons.twitter
                                className="w-7 h-7 text-gray-500 hover:text-gray-900 dark:fill-white cursor-pointer"
                            />

                            <svgIcons.instagram
                                className="w-7 h-7 text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                            />

                        </div>
                    </div>
                </div>
            </footer>


        )
}

export default Footer