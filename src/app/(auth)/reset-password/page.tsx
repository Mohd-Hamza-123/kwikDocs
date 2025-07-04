'use client'
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  console.log(token)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!token) {
      router.push('/')
      return
    }
    const formData = new FormData(e.currentTarget)
    console.log(formData)
  }

  useEffect(() => {
    if (!token) {
      router.push('/')
      return
    }
  }, [])

  return (
    <form
      className="space-y-6"
      onSubmit={submit}>
      <div className="mt-2">
        <Input
          type='password'
          placeholder='new password'
          name='password'
        />
      </div>
      <div className="mt-2">
        <Input
          type='password'
          placeholder='confirm password'
          name='confirm-password'
        />
      </div>
      <div>
        <Button className='w-full' type='submit'>Change Password</Button>
      </div>
    </form>
  )
}

export default ResetPassword