'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import LoginUser from '@/lib/API/Auth/login'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { useMutation } from '@tanstack/react-query'
import {
    overlayLoadingIsTrueReducer,
    overlayLoadingIsFalseReducer,
} from '@/lib/store/features/overlayLoaderSlice'
import getProfile from '@/lib/API/Auth/profile'
import logoutAPI from '@/lib/API/Auth/logout'
import { logout, login } from '@/lib/store/features/authSlice'


const Login = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const getUserData = async () => {
        const user = await getProfile();
        console.log(user);
        if (user) {
            dispatch(login({ userData: user }));
        } else {
            await logoutAPI();
            dispatch(logout());
        }
    }

    const loginMutation = useMutation({
        mutationFn: (payload) => LoginUser(payload),
        onMutate: (variables) => {
            dispatch(overlayLoadingIsTrueReducer({ overlayLoadingMsg: "Please wait you are logging In" }));
        },
        onError: (error: any, variables, context) => {
            toast({
                variant: "destructive",
                title: "Login failed. Try again",
                description: error?.message
            })
        },
        onSuccess: (data, variables, context) => {
            router.push('/')
            getUserData();
            toast({
                title: "You are Logged In",
            });
        },
        onSettled: (data, error, variables, context) => {
            dispatch(overlayLoadingIsFalseReducer());
        },
    })

    const handleLogin = (data: any) => {
        loginMutation.mutate(data)
    }

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
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Log in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <div className="mt-2">
                            <Input
                                type='email'
                                placeholder='email'
                                {...register("email", {
                                    required: true
                                })}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input type='password' placeholder='password'
                                {...register("password", {
                                    required: true
                                })}
                            />
                        </div>
                    </div>
                    <div>
                        <Button className='w-full' type='submit'>Log In</Button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a User ?
                    <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500"> Signup </Link>
                </p>
            </div>
        </div>

    )
}

export default Login