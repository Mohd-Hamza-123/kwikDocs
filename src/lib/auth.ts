import connectDB from "@/conf/database";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import Session from "@/models/session.model";

export async function getCurrentUser() {
    try {
        await connectDB()
        const cookieStore = await cookies()
        const sessionId = cookieStore.get("sessionId")?.value
        if (!sessionId) return null

        const session = await Session.findOne({
            sessionId,
            expiresAt: { $gt: new Date() }
        })

        if (!session) {
            await Session.deleteOne({ sessionId })
            cookieStore.delete("sessionId")
            return null
        }

        const user = await User.findById(session.userId).select("-verifyToken -verifyTokenExpiry")
        return user

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        console.log(message)
        return null

    }
}