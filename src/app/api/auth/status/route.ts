import connectDB from "@/dbConfig/dbConfig";
import getDataFromToken from "@/lib/getDataFromToken";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const userId = await getDataFromToken(request);
        const user = await UserModel.findById(userId).select('-password').lean();

        if (user) {
            return NextResponse.json({
                success: true,
                message: 'You are ',
                payload: user
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "Please login",
            })
        }

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error?.message || "Internal Server Error",
        })
    }
}