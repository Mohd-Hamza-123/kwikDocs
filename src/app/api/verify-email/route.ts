import connectDB from "@/dbConfig/dbConfig";
import hashPassword from "@/lib/HashPassword";
import sendEmail from "@/lib/mailer";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const body = await request.json();
        const {token} = body;
        await UserModel.findOne({verifyToken : token , verifyTokenExpiry :{$gt}});
        
    } catch (error: any) {
        return NextResponse.json({
            success: true,
            error: error?.message || "Internal Server Error"
        }, { status: 500 })
    }
}