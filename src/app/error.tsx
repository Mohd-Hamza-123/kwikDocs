'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
const Error = ({ error, reset }: { error: Error, reset: () => void }) => {

    return (
        <div className="flex flex-col justify-center items-center p-10 text-red-600 h-[76dvh]">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            {process.env.NODE_ENV === "development" && <p>{error.message}</p>}
            <Button
                onClick={() => reset()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Try Again
            </Button>
        </div>
    )
}

export default Error