import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {

        const response = NextResponse.json({
            success: true,
            message: "Logout Successfully"
        })

        response.cookies.set('token', '', {
            httpOnly: true,
            secure : true,
            expires: new Date(0)
        })

        return response

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error?.message || "Internal Server Error",
        })
    }
}