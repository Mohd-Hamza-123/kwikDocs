'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/lib/API/authAPI/register'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { overlayLoadingIsFalseReducer, overlayLoadingIsTrueReducer } from '@/lib/store/features/overlayLoaderSlice'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm();

  const mutationSignup = useMutation({
    mutationFn: async (payload) => registerUser(payload),
    onMutate: (variables) => {
      dispatch(overlayLoadingIsTrueReducer({
        overlayLoadingMsg: "Please wait you are signIn"
      }))
    },
    onError: (error: any, variables, context) => {
      toast({
        variant: "destructive",
        title: "You are not registered",
        description: error?.message
      })
    },
    onSuccess: (data, variables, context) => {
    
      toast({
        title: "You are signIn",
      });
      setTimeout(() => {
        toast({
          title: "Verification email has been sent!",
          description: "verify your email"
        });
      }, 4000);
      router.push('/login')
    },
    onSettled: (data, error, variables, context) => {
      dispatch(overlayLoadingIsFalseReducer());
    },
  })

  const Register = async (data: any) => {
    mutationSignup.mutate(data)
  }

  return (
    <div className='flex justify-center flex-col items-center min-h-screen'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          height={200}
          width={200}
          className="mx-auto h-10 w-auto"
          src="https://img.freepik.com/premium-vector/office-paper-document-with-folder-flat-design_798171-579.jpg"
          alt='Image'
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(Register)}>

          <div className="mt-2">
            <Input
              placeholder='username'
              type='text'
              {...register("username", {
                required: true
              })}
            />
          </div>

          <div className="mt-2">
            <Input placeholder='email' type='email'  {...register("email", {
              required: true
            })} />
          </div>

          <div className="mt-2">
            <Input placeholder='password' type='password'  {...register("password", {
              required: true
            })} />
          </div>

          <div>
            <Button className='w-full'>SignIn</Button>
          </div>
          <div className="text-sm">
            <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have account ?
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login</Link>
        </p>
      </div>
    </div>

  )
}

export default Signup