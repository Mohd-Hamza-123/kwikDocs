'use client'
import React from 'react'

const LoadingPage = ({ loadingMsg }: { loadingMsg?: string }) => {
    return (
        <section className='dark:bg-bgDark min-h-screen bg-gray-100 w-screen fixed top-0 overflow-hidden flex items-center justify-center'>
           
                <div className="flex flex-col items-center">
                    <svg
                        className="animate-spin-fast h-10 w-10 mb-4 text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0116 0H4z"
                        ></path>
                    </svg>
                    <p className="sm:text-lg text-sm break-words text-gray-700 text-center">{loadingMsg || "Please wait..."}</p>
                </div>
       
            <style jsx>{`
                    .animate-spin-fast {
                        animation: spin 0.75s linear infinite;
                    }
    
                    @keyframes spin {
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
        </section>

    )
}

export default LoadingPage
