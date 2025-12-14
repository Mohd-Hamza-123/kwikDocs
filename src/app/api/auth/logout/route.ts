import connectDB from "@/dbConfig/dbConfig";
import Session from "@/models/session.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const token = request.cookies.get("session")
        if (!token) return NextResponse.json({
            success: false,
            message: "Not logged in",
            error: "UNAUTHORIZED",
        }, { status: 401 })

        const session = await Session.findOneAndDelete({ sessionToken: token.value })

        const response = NextResponse.json({
            success: true,
            message: "Logout Successfully"
        }, { status: 200 })

        response.cookies.set("session", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0
        })

        return response
    } catch (error: unknown) {
        const env = process.env.NODE_ENV;
        console.log(error)
        return NextResponse.json({
            success: false,
            error: env === "development" ? (error instanceof Error ? error.message : "Internal Server Error") : "Something went wrong",
            message: "logout failed"
        }, { status: 500 })
    }
}