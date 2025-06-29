import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { svgIcons } from '../icons'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { changePrismTheme } from '@/lib/store/features/editorSlice'

const PrismThemeDropdown = () => {
    const dispatch = useAppDispatch()
    const options = ['okaidia', 'coy', 'dark', 'funky', 'tomorrow', 'twilight', 'solarizedlight', 'holi-theme', 'laserwave', 'atom-dark']

    const themeSwitcher = (theme: string) => {
        dispatch(changePrismTheme({ prismTheme: theme }))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <svgIcons.brush className="h-6 w-6 fill-gray-500 cursor-pointer hover:fill-blue-400 border border-gray-500 rounded-sm p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options?.map((theme) => (
                    <DropdownMenuItem
                        onClick={() => themeSwitcher(theme)}
                        key={theme}>{theme}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PrismThemeDropdown