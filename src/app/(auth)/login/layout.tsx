import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Login = ({ children }: any) => {

    return (
        <div className="flex h-screen flex-col justify-center items-center w-screen fixed top-0 gap-4 z-50" id='login'>

            <Image
                height={200}
                width={200}
                className="mx-auto h-12 w-auto dark:invert"
                src="./logo.png"
                alt='Image'
                quality={100}
            />

            <h2 className="text-center text-2xl/9 font-bold tracking-tight">Log in to your account</h2>

            {children}

            <p className="text-center text-sm/6 text-gray-500">
                Not a User ?
                <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500"> Signup </Link>
            </p>

        </div>

    )
}

export default Login