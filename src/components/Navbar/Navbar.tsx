'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { appName } from '@/constant';
import { Button } from '../ui/button';
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppSelector } from '@/lib/hooks/hooks';
import { IoListCircleOutline } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import { useResponsiveContext } from '@/context/CSS-Context';
import { useTypicalContext } from '@/context/Typical-Context';

const Navbar = () => {

    const router = useRouter()
    const pathName = usePathname();

    const hidePaths = ['/login', '/signup', `/forgot-password`];

    const isDocIndexVisible = pathName.includes('/read-doc');

    const { isSideBarOpen, setIsSideBarOpen } = useTypicalContext();
    const { isDocIndexOpen, setIsDocIndexOpen } = useResponsiveContext();
    const userStatus = useAppSelector((state) => state.auth.userStatus);


    if (hidePaths.includes(pathName)) return null;

    const login = () => router.push('/login');
    const signUp = () => router.push('/signup')

    return (
        <header>
            <nav className="flex justify-between items-center dark:bg-bgDark shadow-xl h-[12vh]  px-3 lg:px-7">
                <Link href={`/`}>
                    <figure className='flex gap-2 items-center cursor-pointer'>
                        <Image
                            height={200}
                            width={200}
                            className="mx-auto h-[32px] lg:h-10 w-auto"
                            src="/logo.jpg"
                            alt='Image'
                        />
                        <figcaption className="font-semibold text-lg lg:text-xl">
                            <h1>{appName}</h1>
                        </figcaption>
                    </figure>
                </Link>
                <div className="space-x-3 lg:space-x-6 text-gray-700 flex items-center">

                    <div
                        className={`block lg:hidden ${isDocIndexVisible ? '' : 'hidden'}`}
                    >
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
                        <Button
                            onClick={login}
                            className='text-sm py-2 px-2 lg:px-3 font-bold'
                        >
                            Login
                        </Button>
                        <Button
                            onClick={signUp}
                            className='text-sm py-2 px-2 lg:px-3 font-bold'
                        >
                            Sign-Up
                        </Button>
                    </>}
                </div>
            </nav>
        </header>
    )
}

export default Navbar