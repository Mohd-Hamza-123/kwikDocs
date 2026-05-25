import React from "react";
import Image from "next/image";
import Link from "next/link";
import siteConfig from "@/conf/site"

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-neutral-950 text-neutral-100">
            {/* LEFT HERO – same as signup */}
            <div className="hidden lg:block relative overflow-hidden">
                {/* Background image */}
                <Image
                    src="/images/hero.webp"
                    alt="Hero"
                    width={1600}
                    height={1600}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/10" />

                {/* Content on top */}
                <div className="relative z-10 flex h-full flex-col justify-between px-12 py-10">
                    {/* Brand row */}
                    <div className="flex items-center gap-3">

                        <img
                            src="/logo.webp"
                            alt="Kwik Docs"
                            width={24}
                            height={24}
                            className="h-24 w-32"
                        />
                        {/* </div> */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold tracking-wide text-pink-300">
                                Kwik Docs
                            </span>
                            <span className="text-xs text-pink-100/80">
                                Read docs like stories.
                            </span>
                        </div>
                    </div>

                    {/* Main hero text */}
                    <div className="pb-10 max-w-xl">
                        <h1 className="text-4xl font-semibold leading-tight text-white">
                            Read the docs like <br /> stories.
                        </h1>
                        <p className="mt-3 text-sm text-pink-100/80 max-w-md">
                            {siteConfig.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE – same structure as signup */}
            <div className="flex items-center justify-center px-6 sm:px-12 lg:px-20 py-12">
                <div className="w-full max-w-md">
                    {children}
                    <div className="mt-6 flex justify-between text-sm text-neutral-400">
                        <p>Don't have an account?</p>
                        <Link href="/signup" className="hover:text-neutral-200">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
