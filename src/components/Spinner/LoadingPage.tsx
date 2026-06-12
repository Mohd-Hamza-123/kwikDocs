import React from 'react'
import { Spinner } from '../ui/spinner'

const LoadingPage = ({ loadingMsg }: { loadingMsg?: string }) => {
    
    return (
        <section className="min-h-screen min-w-screen flex items-center justify-center">
            <Spinner/>
        </section>
    )
}

export default LoadingPage
