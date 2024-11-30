import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";
export function GET() {
    return NextResponse.json({
        success: true,
        message: 'Hi'
    })
}