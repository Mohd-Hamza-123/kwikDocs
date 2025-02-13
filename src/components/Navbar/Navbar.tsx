'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { svgIcons } from '../icons';
import { Button } from '../ui/button';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoListCircleOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useResponsiveContext } from '@/context/CSS-Context';
import { useTypicalContext } from '@/context/Typical-Context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdOutlineNightlightRound } from 'react-icons/md';
import { useTheme } from 'next-themes'
import { siteConfig } from '../../../config/site';


const Navbar = () => {

    const { setTheme: setNextTheme } = useTheme();
    const pathName = usePathname();
    const isDocIndexVisible = pathName.includes('/read-doc');
    const hidePaths = ['/login', '/signup', `/forgot-password`];

    const {
        isSideBarOpen,
        setIsSideBarOpen,
    } = useTypicalContext();

    const {
        isDocIndexOpen,
        setIsDocIndexOpen
    } = useResponsiveContext();


    if (hidePaths.includes(pathName)) return null;

    const lightMode = () => setNextTheme("light")


    const darkMode = () => setNextTheme('dark')

    const systemMode = () => setNextTheme("system")


    return (
        <header className='sticky top-0 border-b border-border bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60'>
            <nav className="flex justify-between items-center dark:bg-bgDark shadow-xl h-[10vh] px-3 lg:px-7">
                <Link href={`/`}>
                    <figure className='flex gap-2 items-center cursor-pointer'>
                        <Image
                            height={200}
                            width={200}
                            className="mx-auto h-[32px] lg:h-10 w-auto"
                            src="/logo.jpg"
                            alt='Image'
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
                        <IoListCircleOutline className={`text-4xl ${isDocIndexOpen ? "text-indigo-600" : ""}`}
                            onClick={() => setIsDocIndexOpen((prev) => !prev)}
                        />
                    </div>


                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {"dark" === "dark" ? <MdOutlineNightlightRound className={"h-6 w-6 text-white"} /> : <svgIcons.light className="w-6 h-6" />}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={lightMode}>Light Mode</DropdownMenuItem>
                            <DropdownMenuItem onClick={darkMode}>Dark Mode</DropdownMenuItem>
                            <DropdownMenuItem onClick={systemMode}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Button
                        onClick={() => setIsSideBarOpen((prev) => !prev)}
                        variant={'outline'} className="hover:text-indigo-500"
                    >
                        <RxHamburgerMenu className='text-2xl' />
                    </Button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar