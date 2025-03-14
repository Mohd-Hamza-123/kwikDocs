'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { svgIcons } from '../icons';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { RxHamburgerMenu } from "react-icons/rx";
import { siteConfig } from '../../../config/site';
import { IoListCircleOutline } from "react-icons/io5";
import { MdOutlineNightlightRound } from 'react-icons/md';
import { useResponsiveContext } from '@/context/CSS-Context';
import { useTypicalContext } from '@/context/Typical-Context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {

    const pathName = usePathname();
    const { setTheme: setNextTheme, theme } = useTheme();


    const hidePaths = ['/login', '/signup', `/forgot-password`];
    const isDocIndexVisible = pathName.includes('/read-doc') || pathName.includes("/docs");

    const {
        isSideBarOpen,
        setIsSideBarOpen,
    } = useTypicalContext();

    const {
        isDocIndexOpen,
        setIsDocIndexOpen
    } = useResponsiveContext();


    const darkMode = () => setNextTheme('dark')
    const lightMode = () => setNextTheme("light")
    const systemMode = () => setNextTheme("system")
    const sideBarToggle = () => setIsSideBarOpen((prev) => !prev)
    const docIndexToggle = () => setIsDocIndexOpen((prev) => !prev)

    if (hidePaths.includes(pathName)) return null;

    return (
        <header className='sticky top-0 border-b border-border bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60 z-50'>
            <nav className="flex justify-between items-center dark:bg-bgDark shadow-xl h-[9dvh] px-3 lg:px-7">

                <Link href={`/`}>
                    <figure className='flex gap-1 items-center cursor-pointer'>
                        <Image
                            height={200}
                            width={200}
                            className="mx-auto h-12 lg:h-10 w-auto dark:invert"
                            src="/logo.png"
                            alt='logo'
                        />
                        <figcaption className="font-semibold text-lg lg:text-xl">
                            <h1>{siteConfig.name}</h1>
                        </figcaption>
                    </figure>
                </Link>

                <div className="space-x-3 lg:space-x-6 text-gray-700 flex items-center">

                    <div
                        className={`block lg:hidden ${isDocIndexVisible ? '' : 'hidden'}`}
                    >
                        <IoListCircleOutline
                            className={`text-4xl ${isDocIndexOpen ? "text-indigo-600" : ""}`}
                            onClick={docIndexToggle}
                        />
                    </div>


                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {theme === "dark" ? <MdOutlineNightlightRound className={"h-6 w-6 fill-white"} /> : <svgIcons.light className="w-6 h-6 fill-black" />}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={lightMode}>Light Mode</DropdownMenuItem>
                            <DropdownMenuItem onClick={darkMode}>Dark Mode</DropdownMenuItem>
                            <DropdownMenuItem onClick={systemMode}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Button
                        onClick={sideBarToggle}
                        variant={'outline'}
                        className="hover:text-indigo-500"
                    >
                        <RxHamburgerMenu className='text-2xl' />
                    </Button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar