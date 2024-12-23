'use client'
import React from 'react'
import Link from 'next/link'
import { Sidebar } from '@/index';
import { Button } from '../ui/button';
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppSelector } from '@/lib/hooks/hooks';
import { usePathname, useRouter } from 'next/navigation'
import { useTypicalContext } from '@/context/Typical-Context';
import { IoListCircleOutline } from "react-icons/io5";
import { useResponsiveContext } from '@/context/CSS-Context';

const Navbar = () => {
    const router = useRouter()
    const hidePaths = ['/login', '/signup'];
    const pathName = usePathname();
  
    const userStatus = useAppSelector((state) => state.auth.userStatus);
    const { isSideBarOpen, setIsSideBarOpen } = useTypicalContext();
    const { isDocIndexOpen, setIsDocIndexOpen } = useResponsiveContext();

    if (hidePaths.includes(pathName)) return null;

    const isDocIndexVisible = pathName.includes('/read-doc');

    return (
        <header className="dark:bg-gray-900 dark:border-gray-700 shadow-xl py-4">
            <div className="container mx-auto px-3 lg:px-6 flex justify-between items-center">
                <Link href={`/`}>
                    <h1 className="text-xl lg:text-2xl font-bold">MyDocs</h1>
                </Link>
                <nav className="space-x-4 lg:space-x-6 text-gray-700 flex items-center">

                    <div className={`block lg:hidden ${isDocIndexVisible ? '' : 'hidden'}`}>
                        <IoListCircleOutline className={`text-4xl ${isDocIndexOpen ? "text-indigo-600" : ""}`}
                            onClick={() => setIsDocIndexOpen((prev) => !prev)}
                        />
                    </div>
                    {userStatus ? <Button
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