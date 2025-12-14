import Session from "@/models/session.model";
import { getCurrentUser } from "@/lib/API/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";

export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const token = request.cookies.get("session")?.value;
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Not logged in",
                    error: "UNAUTHORIZED",
                },
                { status: 401 }
            );
        }

        const data = await Session.findOne({ sessionToken: token, expiresAt: { $gt: new Date() } }).populate("userId");
        const userId  = data?.userId
        console.log(userId)
        const user = await User.findById(userId)
        
        if (!data || !user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Not logged in",
                    error: "UNAUTHORIZED",
                },
                { status: 401 }
            );
        }
    

        return NextResponse.json({
            success: true,
            message: "logged in",
            data: data.userId
        }, { status: 200 })

    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : "Internal server error")
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
            error: "SERVER_ERROR"
        }, { status: 500 });

    }
}