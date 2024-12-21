'use client'
import React from 'react'
import Link from 'next/link'
import { Sidebar } from '@/index';
import { Button } from '../ui/button';
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppSelector } from '@/lib/hooks/hooks';
import { usePathname, useRouter } from 'next/navigation'
import { useTypicalContext } from '@/context/Typical-Context';

const Navbar = () => {
    const router = useRouter()
    const hidePaths = ['/login', '/signup'];
    const pathName = usePathname();
    const userStatus = useAppSelector((state) => state.auth.userStatus);
    const { isSideBarOpen, setIsSideBarOpen } = useTypicalContext();
    
    if (hidePaths.includes(pathName)) return null;

    return (
        <header className="bg-white shadow-xl py-4">
            <div className="container mx-auto px-3 lg:px-6 flex justify-between items-center">
                <Link href={`/`}>
                    <h1 className="text-xl lg:text-2xl font-bold text-indigo-600">MyDocs</h1>
                </Link>
                <nav className="space-x-4 lg:space-x-6 text-gray-700">

                    <Link href="#guides" className="hover:text-indigo-500">
                        Guides
                    </Link>
                    {!userStatus ? <Button
                        onClick={() => setIsSideBarOpen((prev) => !prev)}
                        variant={'outline'} className="hover:text-indigo-500"
                    >
                        <RxHamburgerMenu className='text-2xl' />
                    </Button> : <>
                        <Button onClick={() => router.push('/login')}>
                            Login
                        </Button>
                        <Button onClick={() => router.push('/signup')}>
                            SignIn
                        </Button>
                    </>}
                </nav>
            </div>
            <Sidebar />
        </header>
    )
}

export default Navbar