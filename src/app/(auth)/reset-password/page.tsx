'use client'

import React from 'react'
import { toast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { api, routes } from '@/lib/api/common'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { PasswordMatch, passwordMatchSchema } from '@/lib/validation/authSchema'

const ResetPassword = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordMatch>({
    resolver: zodResolver(passwordMatchSchema),
  });

  const mutation = useMutation({
    mutationFn: api.post,
    onError: (error: unknown) => {
      console.error(error)
      const message = error instanceof Error ? error.message : "something went wrong"
      toast({
        variant: "destructive",
        title: "Failed. Try again later",
        description: message
      });
    },
    onSuccess: (data) => {
      toast({
        variant: "default",
        description: "Password Changed"
      });
      router.replace("/login");
    }
  })


  const submit = async (data: PasswordMatch) => {
    // console.log(data)
    if (!token) {
      toast({
        variant: "destructive",
        description: "Invalid Token. Try again later"
      })
      // router.replace('/')
      return
    }

    const validation = passwordMatchSchema.safeParse(data)

    if (!validation.success) {

      const errors = validation.error.flatten().formErrors[0]
      console.log(errors)

      toast({
        variant: "destructive",
        description: errors
      })

      return
    }

    const { password, confirmPassword } = validation.data

    mutation.mutate({
      url: routes.resetPassword,
      query: { token },
      data: { password, confirmPassword }
    })

  }


  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(submit)}>
      <div className="space-y-1.5">
        <Input
          {...register("password")}
          type='password'
          placeholder='new password'
          name='password'
        />
        {errors?.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Input
          {...register("confirmPassword")}
          type='password'
          placeholder='confirm password'
          name='confirmPassword'
        />
        {errors?.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div>
        <Button disabled={mutation.isPending} className='w-full bg-purple-700 hover:bg-purple-800 text-white' type='submit' > {mutation.isPending ? <Spinner /> : "Change Password"} </Button>
      </div>
    </form>
  )
}

export default ResetPassword