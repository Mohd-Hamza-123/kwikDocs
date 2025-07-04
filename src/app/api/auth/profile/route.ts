import connectDB from "@/dbConfig/dbConfig";
import getDataFromToken from "@/lib/getDataFromToken";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        
        await connectDB();
        const userId = await getDataFromToken(request);
        
        if (!userId) return NextResponse.json(
                {
                    success: false,
                    message: "Cannot get your details",
                },
                { status: 400 }
            )

        const user = await UserModel.findById(userId).select("username bookmark isVerified isAdmin").lean();

        return NextResponse.json({
            success: true,
            payload: user,
            message: 'user found'
        }, { status: 200 })

    } catch (error: any) {
      
        return NextResponse.json({
            success: false,
            message: error?.message || "Internal Server Error",
            error : error
        }, { status: 500 })
    }
}