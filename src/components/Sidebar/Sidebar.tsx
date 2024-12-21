'use client'
import React from 'react'
import Link from 'next/link'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { GrClose } from "react-icons/gr";
import { toast } from '@/hooks/use-toast';
import { GiNightSky } from "react-icons/gi";
import { WiDaySunny } from "react-icons/wi";
import { useRouter } from 'next/navigation';
import { IoMdLogOut } from "react-icons/io";
import { TbPencilCode } from "react-icons/tb";
import logoutAPI from '@/lib/API/authAPI/logout';
import { logout } from '@/lib/store/features/authSlice';
import { useTypicalContext } from '@/context/Typical-Context'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';

const Sidebar = () => {

    const router = useRouter()
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.auth.userData);
    const { isSideBarOpen, setIsSideBarOpen } = useTypicalContext();

    if (!isSideBarOpen) return null

    const closeSideBar = () => {
        setIsSideBarOpen(false)
    }

    const handleLogout = async () => {
        try {
            router.push('/')
            await logoutAPI();
            toast({
                variant: "default",
                title: "Logged out successfully"
            })
            dispatch(logout());
            closeSideBar();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Logged out failed"
            });
            closeSideBar();
        }

    }


    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        const isDark = htmlElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        closeSideBar()
    };
    let isDarkMode = localStorage.getItem('theme') === 'dark';
    return (
        <aside className="shadow-md flex flex-col w-[70%] sm:w-[40%] md:w-[30%] lg:w-[23%] h-screen px-3 lg:px-5 lg:py-8 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 fixed top-0 z-40">
            <span onClick={() => setIsSideBarOpen(false)}>
                <GrClose className='text-lg text-gray-700' />
            </span>
            <div className="flex flex-col justify-around flex-1 mt-6">
                <nav className="flex-1 -mx-3 space-y-3 ">
                    <div className="relative mx-3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <Input placeholder='search' className='pl-10' />
                    </div>
                    <Link
                        onClick={closeSideBar}
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="mx-2 text-sm font-medium">Home</span>
                    </Link>
                    {userData?.isAdmin && <Link
                        href={`/create-docs`}
                        onClick={closeSideBar}
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5V4.875a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v14.25a2.25 2.25 0 002.25 2.25h6.75" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3v5.25a1.5 1.5 0 001.5 1.5h5.25M16.5 14.25v6M13.5 17.25h6" />
                        </svg>


                        <span className="mx-2 text-sm font-medium">Create Docs</span>
                    </Link>}
                    {userData?.isAdmin && <Link
                        href={`/create-tech`}
                        onClick={closeSideBar}
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    >
                        <TbPencilCode />
                        <span className="mx-2 text-sm font-medium">Create tech</span>
                    </Link>}
                    <Link
                        onClick={closeSideBar}
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                        <span className="mx-2 text-sm font-medium">Tasks</span>
                    </Link>
                    <Link
                        onClick={() => toggleDarkMode()}
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                        {isDarkMode ? <WiDaySunny className="w-5 h-5" /> : <GiNightSky className="w-5 h-5" />}
                        <span className="mx-2 text-sm font-medium">{isDarkMode ? 'Light Mode ' : 'Dark Mode'}</span>
                    </Link>
                    <Link
                        onClick={closeSideBar}
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="mx-2 text-sm font-medium">Setting</span>
                    </Link>
                </nav>
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-6">

                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{userData?.username}</span>

                        <Button
                            variant={'destructive'}
                            onClick={handleLogout}
                        >
                            <IoMdLogOut className="text-2xl" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>

    )
}

export default Sidebar