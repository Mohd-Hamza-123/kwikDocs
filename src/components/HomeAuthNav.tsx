"use client"

import Link from 'next/link';
import { cn } from "@/lib/utils";
import React, { useState } from 'react'
import { FiMenu, FiX } from "react-icons/fi";
import Branding from "@/components/Branding";
import { Button } from "@/components/ui/button";

export default function HomeAuthNav({ user }: any) {

    const [open, setOpen] = useState(false);

    const links = [
        {
            name: "Create Account",
            href: "/signup",
            isHidden: user ? true : false
        },
        {
            name: "Login",
            href: "/login",
            isHidden: user ? true : false
        },

    ]

    return (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                <Branding />

                <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
                    {links.map((link) => (
                        <Link
                            href={link.href}
                            className={cn(link.isHidden ? "hidden" : "", "transition hover:text-white")}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user && <Button variant={"destructive"} >
                        Logout
                    </Button>}
                </nav>

                <Button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white hover:bg-white/10">
                    {open ? <FiX size={22} /> : <FiMenu size={22} />}
                </Button>
            </div>

            {open && (
                <div className="md:hidden from-indigo-600/40 via-purple-500/30 to-cyan-400/20">
                    <nav className="flex flex-col px-6 py-4 text-sm font-medium text-gray-300">
                        <Link href="/signup" onClick={() => setOpen(false)} className="py-3 hover:text-white">
                            Sign Up
                        </Link>
                        <Link href="/app/playground" onClick={() => setOpen(false)} className="py-3 hover:text-white">
                            Playground
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
