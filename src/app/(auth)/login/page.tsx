'use client'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import {
    overlayLoadingIsTrueReducer,
    overlayLoadingIsFalseReducer,
} from '@/lib/store/features/overlayLoaderSlice'
import getProfile from '@/lib/API/Auth/profile'
import logoutAPI from '@/lib/API/Auth/logout'
import { logout, login } from '@/lib/store/features/authSlice'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import LoginUser from '@/lib/API/Auth/login'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/lib/hooks/hooks'
import Link from 'next/link'

const Page = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const getUserData = async () => {
        const user = await getProfile();
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
            console.log(error)
            toast({
                variant: "destructive",
                title: "Login failed. Try again",
                description: process.env.NODE_ENV === "development" ? error?.message : ""
            })
        },
        onSuccess: (data, variables, context) => {
            router.push('/')
            getUserData();
            toast({ title: "You are Logged In" });
        },
        onSettled: (data, error, variables, context) => {
            dispatch(overlayLoadingIsFalseReducer());
            console.log(data)
        },
    })

    const handleLogin = (data: any) => {
        loginMutation.mutate(data)
    }

    return (
        <form
            className="mx-auto w-[95%] md:w-[60%] lg:w-[35%] flex flex-col gap-5"
            onSubmit={handleSubmit(handleLogin)}>

            <Input
                type='email'
                placeholder='email'
                {...register("email", {
                    required: true
                })}
            />

            <Input
                type='password'
                placeholder='password'
                {...register("password", {
                    required: true
                })}
            />

            <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
            </div>

            <Button className='w-full' type='submit'>Log In</Button>
        </form>
    )
}

export default Page