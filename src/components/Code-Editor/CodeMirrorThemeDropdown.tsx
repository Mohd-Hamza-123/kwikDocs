'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Themes } from '@/constant'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { svgIcons } from '../icons'
import { changeTheme as themeSwitcher } from '@/lib/store/features/editorSlice'
import { useAppSelector } from '@/lib/hooks/hooks'

const CodeMirrorThemeDropdown = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.editorSlice.theme)
    const changeTheme = (theme: string) => {
        dispatch(themeSwitcher({ theme: theme }))
        localStorage.setItem("editorTheme", theme);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-fit outline-none '>
                <svgIcons.brush className="h-8 w-8 fill-gray-500 cursor-pointer hover:fill-blue-400 border border-gray-500 rounded-sm p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='h-[200px] overflow-y-scroll'>
                {Object.entries(Themes).map(([key, value]) => (
                    <DropdownMenuItem
                        className={`${key === theme ? "bg-indigo-600 text-white" : ""} hover:bg-indigo-400`}
                        onClick={() => changeTheme(key)}
                        key={key}>
                        {key}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CodeMirrorThemeDropdown