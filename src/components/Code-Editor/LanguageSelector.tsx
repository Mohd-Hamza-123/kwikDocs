import React from 'react'
import { Button } from '../ui/button'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '@/constant'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LanguageSelector({ activeLanguage, onLanguageChange }: { activeLanguage: string, onLanguageChange: (language: keyof typeof CODE_SNIPPETS) => void }) {
    const languages = Object.entries(LANGUAGE_VERSIONS)
    return (
        <div>
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
                <Button variant='outline' className='my-2'>{activeLanguage}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages?.map(([language, version]: any) => (
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
        </div>
    )
}
