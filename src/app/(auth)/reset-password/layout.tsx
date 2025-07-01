import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const page = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    height={200}
                    width={200}
                    className="mx-auto h-12 w-auto"
                    src="./logo.png"
                    alt='Image'
                    quality={100}
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Reset Your Password</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                {children}

                <p className="mt-5 text-center text-sm/6 text-gray-500">
                    Not a User ?
                    <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500"> Signup </Link>
                </p>
            </div>
        </div>
    )
}

export default page