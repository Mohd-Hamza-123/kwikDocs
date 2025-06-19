'use client'

import React from 'react'
import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { emailSchema } from '@/lib/validation/authSchema'
import validateZodSchema from '@/utils/wrapper/zod-validation/validateSchema'
import forgotPassword from '@/services/API/auth/forgot-password'

const page = () => {

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")

        const validationResult = validateZodSchema(emailSchema, email)

        if (validationResult.isValid) {
            const email = validationResult?.data
            const res = await forgotPassword(email)
            console.log(res)
        } else {
            const errors = validationResult?.errors
            if (Array.isArray(errors))
                toast({
                    title: errors[0]?.message,
                    variant: 'destructive',
                })
            else {
                toast({
                    title: 'Unexpected Error',
                    variant: 'destructive',
                })
            }
        }
    }
    return (
        <form
            className="space-y-6"
            onSubmit={submit}
        >
            <div className="mt-2">
                <Input
                    type='email'
                    placeholder='email'
                    name='email'
                />
            </div>

            <div>
                <Button className='w-full' type='submit'>Reset</Button>
            </div>
        </form>
    )
}

export default page