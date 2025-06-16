'use client'
import React from 'react'

const LoadingPage = ({ loadingMsg }: { loadingMsg?: string }) => {
    return (
        <section className="dark:bg-gradient-to-br dark:from-[#1e1e1e] dark:via-[#121212] dark:to-[#2c2c2c] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen w-screen fixed top-0 overflow-hidden flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-6">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    {/* Outer Spinner */}
                    <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    {/* Inner Spinner */}
                    <div className="absolute inset-2 border-4 border-t-transparent border-purple-500 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                </div>
            </div>
        </section>
    )
}

export default LoadingPage
