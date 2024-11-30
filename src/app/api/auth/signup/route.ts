import connectDB from "@/dbConfig/dbConfig";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

connectDB();



export function GET() {
    return NextResponse.json({
        success: true,
        message: 'Hi'
    })
}

