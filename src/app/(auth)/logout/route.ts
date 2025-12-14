import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("session")
        console.log(token)
        return NextResponse.json({ success: true, message: "logged out successfully" }, {
            status: 200,
        })
    } catch (error) {
        console.error("error : ", error)
        const env = process.env.NODE_ENV;
        return NextResponse.json({
            success: false,
            error: env === "development" ? (error instanceof Error ? error.message : "Internal Server Error") : "Something went wrong",
            message: "logout failed"
        }, { status: 500 })
    }
}