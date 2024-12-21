import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import Doc from "@/models/docs.model";
import mongoose from 'mongoose';

connectDB()


export async function PATCH(request: NextRequest, { params }: any) {
    try {

        const { id } = params;
        const body = await request.json();

        const { title, description, techType, tags, bookmark } = body;

        if (!id) {
            return NextResponse.json({
                message: "Doc not found",
            }, { status: 400 })
        }

        const doc = await Doc.findByIdAndUpdate(id, {
            title,
            description,
            techType: new mongoose.Types.ObjectId(techType),
            tags,
            bookmark
        }, { new: true });

        return NextResponse.json({
            success: true,
            payload: doc,
            message: "Document updated successfully"
        }, { status: 200 })

    } catch (error: any) {
        console.log("error", error?.message);
        return NextResponse.json({
            error: error?.message,
            success: false,
        }, { status: 500 })
    }

}