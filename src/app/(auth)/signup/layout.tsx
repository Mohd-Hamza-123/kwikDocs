import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-center flex-col items-center min-h-screen'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    height={200}
                    width={200}
                    className="mx-auto h-12 w-auto"
                    src="./logo.png"
                    alt='Image'
                />
                <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create Account</h2>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {children}
                <p className="text-center text-sm/6 text-gray-500">
                    Already have account ?
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default layout