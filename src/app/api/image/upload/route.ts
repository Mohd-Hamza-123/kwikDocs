import connectDB from "@/dbConfig/dbConfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import TechModel from "@/models/tech.model";
import uploadImage from "@/lib/imageConfig/imageUpload";
connectDB();

export async function POST(req: NextRequest) {
    try {

        const formData = await req.formData();
        const image = formData.get('image') as File | null
        // const userId = formData.get('userId') as string | null
        const folder = formData.get('folder') as string

        if (!image) return NextResponse.json(
            {
                message: 'No image received',
                success: false
            }, { status: 401 })

        
        const result = await uploadImage(image, folder) as { public_id: string, secure_url: string }

        if (!result) {
            return NextResponse.json(
                {
                    message: "Image not uploaded",
                    success: false
                },
                { status: 401 }
            )
        } else {
            return NextResponse.json(
                {
                    payload: {
                        public_id: result?.public_id,
                        secure_url: result?.secure_url
                    },
                    message: "Image Uploaded",
                    success: true
                },
                { status: 200 }
            )
        }
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

export async function DELETE(req: NextRequest) {
    const images = req.body
    return NextResponse.json({
        success: true,
        images
    }, { status: 200 })
}