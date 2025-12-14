
import connectDB from "@/dbConfig/dbConfig";
import TechModel from "@/models/tech.model";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';  // This forces the route to be dynamic
export const fetchCache = 'force-no-store';  // This prevents caching
export const revalidate = 0; // if 60 then data will be cached for 60 seconds
connectDB();
export async function GET(request: NextRequest, { params }: any) {
    try {
        const { id } = params;
      
        const payload = await TechModel.findById(id);
        if (payload) {
            return NextResponse.json({
                success: true,
                message: "Data found",
                payload
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "failed to get data",
            }, { status: 400 })
        }

    } catch (error: any) {
        console.log("((error))--> ", error)
        return NextResponse.json({
            success: false,
            message: "failed to get data",
            error: error?.message || 'Internal server error'
        }, { status: 500 })
    }
}