'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
        <header className="dark:bg-gray-900 dark:border-gray-700 shadow-xl h-[12vh] content-center px-3 lg:px-6">
            <nav className="flex justify-between items-center">
                <Link href={`/`}>
                    <figure className='flex gap-1 items-center cursor-pointer'>
                        <Image
                            height={200}
                            width={200}
                            className="mx-auto h-10 w-auto"
                            src="https://img.freepik.com/premium-vector/office-paper-document-with-folder-flat-design_798171-579.jpg" alt='Image' />
                        <figcaption className="font-semibold text-xl"> <h1>Documentarium
                        </h1> </figcaption>
                    </figure>
                </Link>
                <div className="space-x-4 lg:space-x-6 text-gray-700 flex items-center">

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
                </div>
            </nav>
        </header>
    )
}

export default Navbar