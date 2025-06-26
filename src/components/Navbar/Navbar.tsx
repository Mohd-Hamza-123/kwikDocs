'use client'
import React from 'react';
import { Branding } from '@/index';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoListCircleOutline } from "react-icons/io5";
import { useResponsiveContext } from '@/context/CSS-Context';
import { useTypicalContext } from '@/context/Typical-Context';
import { svgIcons } from '../icons';

const Navbar = () => {

    const pathName = usePathname();
    const hidePaths = ['/login', '/signup', `/forgot-password`];
    const isDocIndexVisible = pathName.includes('/read-doc') || pathName.includes("/docs");

    const { setIsSideBarOpen, setIsDocSearchOpen } = useTypicalContext();

    const {
        isDocIndexOpen,
        setIsDocIndexOpen
    } = useResponsiveContext();

    const docIndexToggle = () => setIsDocIndexOpen((prev) => !prev)
    const sideBarToggle = () => setIsSideBarOpen((prev) => !prev)
    const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.blur()
        setIsDocSearchOpen(true)
    }

    if (hidePaths.includes(pathName)) return null;

    return (
        <header className="fixed top-0 border-b border-border bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60 z-10 w-full h-[9vh]">
            <nav
                className="flex justify-between items-center dark:bg-bgDark shadow-xl h-[9dvh] px-3 lg:px-7 w-full"
                aria-label="Main Navigation">

                <Branding />

                <div className="space-x-3 lg:space-x-6 text-gray-700 flex items-center w-[30%]">
                    <div className={`block lg:hidden ${isDocIndexVisible ? "" : "hidden"}`}>
                        <IoListCircleOutline
                            className={`text-4xl ${isDocIndexOpen ? "text-indigo-600" : ""}`}
                            onClick={docIndexToggle}
                        />
                    </div>

                    <div className="flex md:gap-3 gap-2 lg:gap-4 w-full justify-end lg:justify-between items-center">
                        <div className='flex items-center lg:w-[300px] md:w-[150px]'>
                            <svgIcons.search onClick={() => setIsDocSearchOpen(true)} className='h-6 w-6 cursor-pointer md:hidden' />
                            <Input
                                placeholder="Search..."
                                className="w-full hidden md:block"
                                onFocus={onInputFocus} />
                        </div>


                        <Button
                            onClick={sideBarToggle}
                            variant={"outline"}
                            className="hover:text-indigo-500">
                            <RxHamburgerMenu className="text-2xl" />
                        </Button>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Navbar