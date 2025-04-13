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

export default function CodeOutput({ output }: { output: string }) {
    // console.log(output)
    return (
        <div className='w-full h-[95%]'>
            <Card className='w-full rounded-none h-full'>
                <CardHeader className='h-full'>
                    <CardTitle>{output ? "Output : " : "Run Code"}</CardTitle>
                    <CardDescription className={`h-[100%] whitespace-pre overflow-y-scroll text-md`}>
                        {output ? output : 'Click "Run Code" to execute the Code'}
                    </CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>
    )
}
