"use server"

import { cookies } from "next/headers";
import connectDB from "@/dbConfig/dbConfig";
import Session from "@/models/session.model";
import User from "@/models/user.model";

export async function getCurrentUser() {
    await connectDB();
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    if (!sessionToken) return null;

    const session = await Session.findOne({
        sessionToken,
        expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!session) return null;

    const user = await User.findById(session.userId);

    if (!user) return null;

    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    };
}
