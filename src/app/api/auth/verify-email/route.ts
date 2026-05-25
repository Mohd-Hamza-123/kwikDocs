import connectDB from "@/conf/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const token = request.nextUrl.searchParams.get("token")

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token"
            }, { status: 400 })
        }
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "verification Link Expired. Try again later"
            }, { status: 400 })
        }

        const updateUser = await User.findByIdAndUpdate(user?._id, {
            $set: {
                isVerified: true,
            },
            $unset: {
                verifyToken: "",
                verifyTokenExpiry: "",
            }
        }, { new: true })

        return NextResponse.json({
            success: true,
            message: "Email Verified"
        })

    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        const env = process.env.NODE_ENV;
        return NextResponse.json({
            success: true,
            message: "Verification failed"
        }, { status: 500 })
    }
}