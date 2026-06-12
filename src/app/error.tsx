'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Error = ({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) => {
    return (
        <div className="flex min-h-screen items-center justify-center p-6">
          
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Something went wrong
                    </h2>

                    <p className="mt-3 text-sm text-muted-foreground">
                        An unexpected error occurred while processing your request.
                    </p>

                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-6 w-full rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                            <p className="font-mono text-sm text-red-500 break-words">
                                {error.message}
                            </p>
                        </div>
                    )}

                    <Button
                        onClick={reset}
                        size="lg"
                        className="mt-8 gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </Button>
                </div>
            
        </div>
    )
}

export default Error