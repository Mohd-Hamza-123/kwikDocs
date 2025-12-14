import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { token } = body;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token"
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
        }, { new: true }).select("-password").lean();

        return NextResponse.json({
            success: true,
            message: "Email Verified",
            payload: updateUser
        })

    } catch (error: unknown) {
        console.log(error);
        const env = process.env.NODE_ENV;
        return NextResponse.json({
            success: true,
            error: env === "development" ? (error instanceof Error ? error.message : "Internal Server Error") : "Something went wrong",
            message: "verify failed"
        }, { status: 500 })
    }
}