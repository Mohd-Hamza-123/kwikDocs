'use client'
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { executeCode } from '@/lib/API/Code/execute-Code'
import { LANGUAGE_VERSIONS } from '@/constant'

export default function CodeOutput({
    codeValue,
    activeLanguage }: { codeValue: string, activeLanguage: any }) {

    const [output, setOutput] = useState(null)

    const runCode = async () => {
        if (!codeValue) return
        try {
            const { run: result } = await executeCode(codeValue, activeLanguage)
            setOutput(result?.output)
        } catch (error) {

        }

    }
    return (
        <>
            <Button
                variant='destructive'
                className='ml-1 mt-1'
                onClick={runCode}
            >Run Code</Button>
            <Card className='w-1/2 mt-2 rounded-none'>
                <CardHeader>
                    {/* <CardTitle>Card Title</CardTitle> */}
                    <CardDescription>{output ? output : 'Click "Run Code" to execute the Code'}</CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </>
    )
}
