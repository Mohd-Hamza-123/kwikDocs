import React from 'react'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Root() {
    const cookie = await cookies()
    const session = cookie.get("session")?.value
    // console.log(session)

    if (session) {
        redirect("/home")
    }

    redirect("/get-started")
}
