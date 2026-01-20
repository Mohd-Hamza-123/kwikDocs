import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col-reverse lg:flex-row relative h-[91dvh] overflow-x-hidden w-full justify-between">
            {children}
        </div>
    )
}

export default layout