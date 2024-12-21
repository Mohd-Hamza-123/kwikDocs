import connectDB from "@/dbConfig/dbConfig";
import getDataFromToken from "@/lib/getDataFromToken";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const userId = await getDataFromToken(request);
      
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Cannot get your details",
            }, { status: 400 })
        }
        const user = await UserModel.findById(userId).select("-password -verifyToken -verifyTokenExpiry").lean();

        return NextResponse.json({
            success: true,
            payload: user,
            message: 'user found'
        }, { status: 200 })

    } catch (error: any) {
        console.log("error", error?.message)
        return NextResponse.json({
            success: false,
            message: error?.message || "Internal Server Error",
        }, { status: 500 })
    }
}