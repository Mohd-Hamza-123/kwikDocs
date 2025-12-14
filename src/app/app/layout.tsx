import React from 'react'
import { Footer, Navbar, Overlay, SearchDocs, Sidebar } from '@/components'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <Overlay />
            <Sidebar />
            <SearchDocs />
            <main>{children}</main>
            <Footer />
        </>
    )
}
