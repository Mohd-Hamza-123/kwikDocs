import React from 'react'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { svgIcons } from './icons';
import { useTheme } from 'next-themes';
import { MdOutlineNightlightRound } from 'react-icons/md';

const ThemeToggle = ({ closeSideBar }: any) => {
    const { setTheme: setNextTheme, theme } = useTheme();

    const darkMode = () => {
        setNextTheme('dark')
        closeSideBar()
    }
    const lightMode = () => {
        setNextTheme("light")
        closeSideBar()
    }
    const systemMode = () => {
        setNextTheme("system")
        closeSideBar()
    }

    return (
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
    )
}

export default ThemeToggle