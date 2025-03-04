import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { LANGUAGE_VERSIONS } from '@/constant'

export default function LanguageSelector({ activeLanguage, onLanguageChange }: { activeLanguage: string, onLanguageChange: (language: string) => void }) {
    const languages = Object.entries(LANGUAGE_VERSIONS)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
                <Button variant='outline' className='my-2'>{activeLanguage}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages?.map(([language, version]) => (
                    <DropdownMenuItem
                        key={language}
                        onClick={() => onLanguageChange(language)}
                    >
                        {language}
                        <span className='text-sm font-extralight'>{version}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
