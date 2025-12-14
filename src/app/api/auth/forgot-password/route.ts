import sendEmail from "@/lib/mailer";
import User from "@/models/user.model";
import connectDB from "@/dbConfig/dbConfig";
import { type_Reset_Email } from "@/constant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { email } = body;
        console.log("Email ---- ", email)
        const user = await User.findOne({ email: email }, { _id: 1 })
        console.log("user_Id ---- ", user?._id?.toString())
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Email"
            }, { status: 400 })
        }

        const sender = await sendEmail({ email, emailType: type_Reset_Email, userId: user?._id.toString() })
        console.log(sender)

        if (sender && sender?.accepted?.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Email Sent"
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "Email Not Sent"
            }, { status: 400 })
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: error?.message || "Internal Server Error"
        }, { status: 500 })
    }
}