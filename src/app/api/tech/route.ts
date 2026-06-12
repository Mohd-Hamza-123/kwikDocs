import connectDB from "@/conf/database";
import { NextResponse } from "next/server";
import { getAllTechnology } from "@/lib/getAllTechnology"

export async function GET() {
    try {

        await connectDB()
        const payload = await getAllTechnology()
        
        return NextResponse.json({
            success: true,
            message: "Data found",
            payload,
        }, { status: 200 })

    } catch (error: unknown) {

        console.error("error : ", error instanceof Error ? error.message : error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 })
    }
}