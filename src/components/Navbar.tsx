'use client'
import React from 'react';
import { Input } from './ui/input';
import { svgIcons } from './icons';
import { Button } from './ui/button';
import { CiCircleList } from "react-icons/ci";
import { usePathname } from 'next/navigation';
import { Branding, ThemeToggle } from '@/index';
import { RxHamburgerMenu } from "react-icons/rx";
import { useResponsiveContext } from '@/context/CSS-Context';
import { useTypicalContext } from '@/context/Typical-Context';

const Navbar = () => {

    const pathName = usePathname();

    const showList = pathName.includes("/docs");

    const { setIsSideBarOpen, setIsDocSearchOpen } = useTypicalContext();

    const {
        isDocIndexOpen,
        setIsDocIndexOpen
    } = useResponsiveContext();
    const closeSideBar = () => setIsSideBarOpen(false)
    const docIndexToggle = () => setIsDocIndexOpen((prev) => !prev)
    const sideBarToggle = () => setIsSideBarOpen((prev) => !prev)
    const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.blur()
        setIsDocSearchOpen(true)
    }


    return (
        <header className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <Branding />

                <div className="flex items-center gap-3">

                    {showList && <Button
                        size="icon"
                        variant="ghost"
                        onClick={docIndexToggle}
                        className="border rounded-xl hover:bg-indigo-500/10 hover:text-indigo-400 lg:hidden">
                        <CiCircleList className={`${isDocIndexOpen ? "text-indigo-400" : "text-muted-foreground"}`}
                        />
                    </Button>}

                    {showList && <ThemeToggle closeSideBar={closeSideBar} />}

                    <div className="relative hidden w-[180px] md:block lg:w-[340px]">
                        <svgIcons.search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Search documentation..."
                            onFocus={onInputFocus}
                            className="h-10 rounded-xl border-white/10 bg-white/[0.03] pl-10 text-sm shadow-sm transition-all placeholder:text-muted-foreground focus-visible:border-indigo-500/50 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                        />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsDocSearchOpen(true)}
                        className="rounded-xl hover:bg-indigo-500/10 hover:text-indigo-400 md:hidden">
                        <svgIcons.search className="h-5 w-5" />
                    </Button>

                    <Button
                        onClick={sideBarToggle}
                        variant="outline"
                        size="icon"
                        className="rounded-xl border-white/10 bg-white/[0.03] hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400">
                        <RxHamburgerMenu className="h-5 w-5" />
                    </Button>
                </div>

            </div>
        </header>

    )
}

export default Navbar