'use client'
import React from 'react'
import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { api, routes } from '@/lib/api/common'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useMutation } from '@tanstack/react-query'
import { emailSchema } from '@/lib/validation/authSchema'

const ForgotPassword = () => {

    const mutation = useMutation({
        mutationFn: api.post,
        onError: (error: unknown) => {
            console.error(error)
            const message = error instanceof Error ? error.message : "something went wrong"
            toast({
                variant: "destructive",
                title: "Failed",
                description: message
            });
        },
        onSuccess: (data) => {
            toast({
                variant: "default",
                description: "Check your email for password reset link"
            });
            
        }
    })

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        let email = formData.get("email") as string

        const validationResult = emailSchema.safeParse(email)
        if (!validationResult.success) {
            toast({
                title: "Invalid email",
                description: validationResult.error.message,
                variant: "destructive"
            })
            return
        }

        email = validationResult.data
        mutation.mutate({ url: routes.forgotPassword, query: { email } })

    }

    return (
        <form
            className="space-y-6"
            onSubmit={submit}>
            <div className="mt-2">
                <Input
                    type='email'
                    name='email'
                    placeholder='email'
                />
            </div>

            <Button disabled={mutation.isPending} className="w-full bg-purple-700 hover:bg-purple-800 text-white">
                {mutation.isPending ? <Spinner /> : "Reset Password"}
            </Button>

        </form>
    )
}

export default ForgotPassword