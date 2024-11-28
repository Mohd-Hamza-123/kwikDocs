'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar } from '@/index';
import { Button } from '../ui/button';
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
                    <Button variant={'outline'} className="hover:text-indigo-500">
                        <RxHamburgerMenu className='text-2xl' />
                    </Button>
                </nav>
            </div>
            <Sidebar />
        </header>
    )
}

export default Navbar