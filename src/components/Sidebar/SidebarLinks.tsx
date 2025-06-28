import React from 'react'
import { svgIcons } from "../icons";
import { CiLogin } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";
import { TbPencilCode } from "react-icons/tb";
import Link from 'next/link'
import { memo } from 'react';

const SidebarLinks = ({
    userData,
    userStatus,
    closeSideBar,
}: {
    userData: any,
    userStatus: boolean,
    closeSideBar: any,
}) => {

    const navLinks = [
        {
            slug: '/',
            name: 'Home',
            icon: <svgIcons.home className="w-5 h-5" />,
            isVisible: true
        },
        {
            slug: '/signup',
            name: 'Sign Up',
            icon: <BiLogInCircle className="h-5 w-5" />,
            isVisible: userStatus ? false : true
        },
        {
            slug: '/login',
            name: 'Login',
            icon: <CiLogin className="w-5 h-5" />,
            isVisible: userStatus ? false : true,
        },
        {
            slug: "/playground",
            name: "Playground",
            icon: <svgIcons.playground className="w-5 h-5 fill-gray-800 dark:fill-white" />,
            isVisible: true
        },
        {
            slug: '/create-docs',
            name: 'Create Document',
            icon: <svgIcons.createDoc className="w-5 h-5" />,
            isVisible: userData?.isAdmin ? true : false
        },
        {
            slug: '/create-tech',
            name: 'Create Tech',
            icon: <TbPencilCode />,
            isVisible: userData?.isAdmin ? true : false
        }
    ]

    return (
        <>
            {navLinks?.map((nav) => (
                <Link
                    key={nav?.slug}
                    href={nav.slug}
                    onClick={closeSideBar}
                    className={`${nav.isVisible ? '' : 'hidden'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}>
                    {nav.icon}
                    <span className="mx-2 text-sm font-medium">{nav.name}</span>
                </Link>
            ))}
        </>
    )
}

export default memo(SidebarLinks)
