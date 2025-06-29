import React from 'react'
import { svgIcons } from '../icons'
import { toast } from '@/hooks/use-toast'
import Prism from '../Prism';
import PrismThemeDropdown from '../Code-Editor/PrismThemeDropdown';


const CopyCode = ({ code, language }: { code: string, language: string }) => {


    const copy = () => {
        try {
            navigator.clipboard.writeText(code)
            toast({ title: 'code copied', })
        } catch (error: any) {
            toast({ title: 'error', variant: 'destructive', description: error?.message })
        }
    }


    return (
        <Prism>
            <pre className='relative'>
                <div className='absolute top-2 right-4 z-10'>
                    <svgIcons.copy
                        onClick={copy} className="h-6 w-6 fill-gray-500 cursor-pointer hover:fill-blue-400 mb-4 border border-gray-500 p-1 rounded-sm" />
                    <PrismThemeDropdown />
                </div>

                <code className={`language-${language}`}>{code}</code>
            </pre>
        </Prism>
    )
}

export default CopyCode