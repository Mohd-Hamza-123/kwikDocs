'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
const Navbar = () => {
    const hidePaths = ['login', 'signup', '/'];
    const pathName = usePathname();
    console.log(pathName)
    if (hidePaths.includes(pathName)) return null;
    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">MyDocs</h1>
                <nav className="space-x-6 text-gray-700">
                    <Link href="#tutorials" className="hover:text-indigo-500">
                        Tutorials
                    </Link>
                    <Link href="#guides" className="hover:text-indigo-500">
                        Guides
                    </Link>
                    <Link href="#contact" className="hover:text-indigo-500">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar