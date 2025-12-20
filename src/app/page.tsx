import React from 'react'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import GetStarted from './get-started/page'

export default async function Root() {

    const cookie = await cookies()
    const session = cookie.get("session")?.value

    if (session) {
        redirect("/home")
    }

    return <GetStarted />
}
