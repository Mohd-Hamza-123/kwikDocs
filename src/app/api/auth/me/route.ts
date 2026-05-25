import connectDB from "@/conf/database";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const sessionId = request.cookies.get("sessionId")?.value

        if (!sessionId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const session = await Session.findOne({
            sessionId,
            expiresAt: { $gt: new Date() }
        })

        // console.log(session)

        if (!session) {
            await Session.deleteOne({ sessionId })
            const response = NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 });
            response.cookies.delete("sessionId")
            return response
        }

        const user = await User.findById(session.userId).select("-verifyToken -verifyTokenExpiry")

        if (!user) {
            await Session.deleteOne({ sessionId })
            const response = NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 });
            response.cookies.delete("sessionId")
            return response
        }

        return NextResponse.json({
            success: true,
            data: user,

        }, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        console.log(message)
        return NextResponse.json({
            success: false,
            message
        }, { status: 500 });
    }
}