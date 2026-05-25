import connectDB from "@/conf/database";
import Session from "@/models/session.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        await connectDB();
        const sessionId = request.cookies.get("sessionId")?.value
        if (!sessionId) return NextResponse.json({
            success: false,
            message: "unauthorized",
        }, { status: 401 })

        const session = await Session.findOneAndDelete({ sessionToken: sessionId })

        const response = NextResponse.json({
            success: true,
            message: "Logout Successfully"
        }, { status: 200 })

        response.cookies.delete("sessionId")

        return response
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        console.log(message)
        return NextResponse.json({
            success: false,
            message
        }, { status: 500 });
    }
}