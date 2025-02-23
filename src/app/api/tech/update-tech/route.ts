import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
    try {
        await connectDB();
        const { id } = params;

        return NextResponse.json({
            success: true,
            message: "failed to get data",
            payload: id,
        }, { status: 400 })


    } catch (error: any) {
        console.log("((error))--> ", error)
        return NextResponse.json({
            success: false,
            message: "failed to get data",
            error: error?.message || 'Internal server error'
        }, { status: 500 })
    }
}