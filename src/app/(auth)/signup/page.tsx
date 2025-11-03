'use client'
import React from 'react'
import { toast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/lib/API/Auth/register'
import {
  overlayLoadingIsFalseReducer,
  overlayLoadingIsTrueReducer
} from '@/lib/store/features/overlayLoaderSlice'
import { signupSchema, signupSchemaType } from '@/lib/validation/authSchema'

const Signup = () => {

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema)
  });

  const mutationSignup = useMutation({
    mutationFn: (payload: signupSchemaType) => registerUser(payload),
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

  const Register = async (data: signupSchemaType) => mutationSignup.mutate(data)

  return (
    <div className="min-h-full w-full grid place-items-center px-2 py-2">
      <div className="w-full max-w-2xl bg-card">

        <form className="space-y-5 pb-4 pt-4" onSubmit={handleSubmit(Register)}>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              className={`h-9 rounded-xl ${errors?.username ? 'ring-2 ring-destructive' : ''}`}
              {...register("username")}
            />
            {errors?.username && (
              <p className="text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email"
              type="email"
              className={`h-9 rounded-xl ${errors?.email ? 'ring-2 ring-destructive' : ''}`}
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              className={`h-9 rounded-xl ${errors?.password ? 'ring-2 ring-destructive' : ''}`}
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button className="w-full h-9 rounded-xl font-medium shadow-sm">
            SignIn
          </Button>

        </form>
      </div>
    </div>
  )
}

export default Signup
