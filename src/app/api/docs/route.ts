import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import Doc from "@/models/docs.model";

connectDB()


export async function GET(request: NextRequest) {
    try {
        const Docs = await Doc.find()
        return NextResponse.json({
            success: true,
            payload: Docs,
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error: error,
            status: 500
        })
    }

}





