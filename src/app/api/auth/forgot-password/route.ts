import sendEmail from "@/lib/mailer";
import User from "@/models/user.model";
import connectDB from "@/conf/database";
import { connectRedis } from "@/conf/redis";
import { rateLimit } from "@/lib/rateLimit";
import { RESET_PASSWORD } from "@/constant";
import { NextRequest, NextResponse } from "next/server";

const LIMIT = 3;
const WINDOW = 60 * 60; // 1 hour

export async function POST(request: NextRequest) {
    try {

        await connectDB();
        await connectRedis();

        const email = request.nextUrl.searchParams.get("email")
        console.log(email)

        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Invalid Email"
            }, { status: 400 })
        }

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            "unknown";

        const limit = await rateLimit(`auth:forgot-password:${ip}:${email}`, LIMIT, WINDOW);

        if (!limit.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: limit.message,
                    retryAfter: limit.retryAfter,
                },
                {
                    status: 429,
                }
            );
        }

        const user = await User.findOne({ email: email }, { _id: 1 })
   
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Email"
            }, { status: 400 })
        }

        const mail = await sendEmail({
            email,
            emailType: RESET_PASSWORD,
            userId: user?._id.toString()
        })


        if (!mail.success) {
            return NextResponse.json({
                success: false,
                message: "Email Not Sent"
            }, { status: 400 })

        }

        return NextResponse.json({
            success: true,
            message: "Email Sent"
        }, { status: 200 })


    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }
}