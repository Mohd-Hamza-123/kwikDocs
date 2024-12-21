import connectDB from "@/dbConfig/dbConfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import TechModel from "@/models/tech.model";
import uploadImage from "@/lib/imageConfig/imageUpload";

connectDB();

export async function DELETE(req: NextRequest) {
    try {
        return NextResponse.json(
            {
                message: "Image Deleted",
                success: true,
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal Server Error",
                success: false,
                error,
            },
            { status: 500 }
        )
    }
}

