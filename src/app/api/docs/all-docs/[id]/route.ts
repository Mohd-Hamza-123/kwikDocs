import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import Doc from "@/models/docs.model";

connectDB()


export async function GET(request: NextRequest, { params }: any) {
    try {

        const { id: techId } = params;
        const { searchParams } = new URL(request.nextUrl);

        const limit = parseInt(searchParams.get("limit") || "1");
        const pageParam = parseInt(searchParams.get("pageParam") || "1");
        const skip = (pageParam - 1) * limit;
      
        if (!techId) {
            return NextResponse.json({
                message: "Technology not found",
            }, { status: 400 })
        }

        const totalDocs = await Doc.countDocuments({ techType: techId });
        const docs = await Doc.find({ techType: techId }).limit(limit).skip(skip);

        // console.log("docs :", docs)
        return NextResponse.json({
            success: true,
            payload: docs,
            nextPage: pageParam + 1,
            totalPage: Math.ceil(totalDocs / limit)
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            error: error?.message,
            success: false,
        }, { status: 500 })
    }

}





