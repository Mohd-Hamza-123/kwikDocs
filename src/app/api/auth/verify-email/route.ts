import connectDB from "@/dbConfig/dbConfig";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { token } = body;

        const user = await UserModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token"
            }, { status: 400 })
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
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

    } catch (error: any) {

        console.log(error);
        return NextResponse.json({
            success: true,
            error: error?.message || "Internal Server Error"
        }, { status: 500 })
    }
}