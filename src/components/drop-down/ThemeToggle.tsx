import React from 'react'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { svgIcons } from '../icons';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { MdOutlineNightlightRound } from 'react-icons/md';

const ThemeToggle = ({ closeSideBar }: { closeSideBar: () => void }) => {

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
                <Button variant="ghost" className='px-2'>
                    {theme === "dark" ? <MdOutlineNightlightRound className={"fill-white"} /> : <svgIcons.light className="fill-black" />}
                </Button>
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