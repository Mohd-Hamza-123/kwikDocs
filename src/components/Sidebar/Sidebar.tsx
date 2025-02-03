'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react'
import Link from 'next/link'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { svgIcons } from "../icons";
import { CiLogin } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";
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
    const userStatus = useAppSelector((state) => state.auth.userStatus)
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



    return (
        <Sheet
            open={isSideBarOpen}
            onOpenChange={setIsSideBarOpen}>
            <SheetTrigger asChild>Open</SheetTrigger>
            <SheetContent side={"right"}>
                <SheetHeader>
                    <div className="flex flex-col justify-around flex-1 mt-6">
                        <nav className="flex-1 -mx-3 space-y-3 ">
                            <div className="relative mx-3">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svgIcons.search className="w-5 h-5 text-gray-400" />
                                </span>
                                <Input placeholder='search' className='pl-10' />
                            </div>
                            <Link
                                onClick={closeSideBar}
                                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                                <svgIcons.home className="w-5 h-5" />
                                <span className="mx-2 text-sm font-medium">Home</span>
                            </Link>
                            {!userStatus && <Link
                                onClick={closeSideBar}
                                href="/login"
                                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                                <CiLogin className="w-5 h-5" />
                                <span className="mx-2 text-sm font-medium">Login</span>
                            </Link>}
                            {!userStatus && <Link
                                onClick={closeSideBar}
                                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" 
                                href="/signup"
                                >
                                <BiLogInCircle className="h-5 w-5" />
                                <span className="mx-2 text-sm font-medium">Sign-up</span>
                            </Link>}
                            {userData?.isAdmin && <Link
                                href={`/create-docs`}
                                onClick={closeSideBar}
                                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">

                                <svgIcons.createDoc className="w-5 h-5" />

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
                                <svgIcons.setting className="w-5 h-5" />
                                <span className="mx-2 text-sm font-medium">Setting</span>
                            </Link>
                        </nav>

                        {userStatus && <div className="flex items-center justify-between mt-6">

                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{userData?.username}</span>

                            <Button
                                variant={'destructive'}
                                onClick={handleLogout}
                            >
                                <IoMdLogOut className="text-2xl" />
                            </Button>
                        </div>}

                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>


    )
}

export default Sidebar