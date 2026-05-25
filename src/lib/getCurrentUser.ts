import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Session from "@/models/session.model"

async function getCurrentUser() {
    try {
        const cookie = await cookies()
        const sessionId = cookie.get("sessionId")?.value

        if (!sessionId) {
            redirect("/login")
        }

        const session = await Session.findOne({ sessionId }).populate({
            path : "userId",
            select : ""
        })

        console.log(session)

        return session?.userId

    } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        redirect("/login")
    }
}

export default getCurrentUser