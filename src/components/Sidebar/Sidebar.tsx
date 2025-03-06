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
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { svgIcons } from "../icons";
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { IoMdLogOut } from "react-icons/io";
import logoutAPI from '@/lib/API/Auth/logout';
import { logout } from '@/lib/store/features/authSlice';
import { useTypicalContext } from '@/context/Typical-Context'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { useResponsiveContext } from "@/context/CSS-Context";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {

    const router = useRouter()
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.auth.userData);
    const userStatus = useAppSelector((state) => state.auth.userStatus)
    const { isSideBarOpen, setIsSideBarOpen } = useTypicalContext();
    const { isDocIndexOpen, setIsDocIndexOpen } = useResponsiveContext();

    const closeSideBar = () => setIsSideBarOpen(false)

    const handleLogout = async () => {
        try {
            await logoutAPI();
            router.push('/')
            closeSideBar();
            toast({
                variant: "default",
                title: "Logged out successfully"
            })
            dispatch(logout());
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Logged out failed"
            });
            closeSideBar();
        }

    }

    if (!isSideBarOpen) return null

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

                            <SidebarLinks
                                userData={userData}
                                userStatus={userStatus}
                                closeSideBar={closeSideBar}
                                setIsDocIndexOpen={setIsDocIndexOpen}
                            />
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