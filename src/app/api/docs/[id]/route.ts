import { NextResponse } from 'next/server';
import Doc from "@/models/docs.model";
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import connectDB from '@/dbConfig/dbConfig';
import { TechModel } from '@/models/tech.model';


connectDB()
export async function PUT(request: any, { params }: Params) {
    const { id } = params
    try {

        const { title, description, tags, category, image, bookmark } = await request.json()

        const newObject = {
            title,
            description,
            tags,
            category,
            image,
            bookmark
        }

        await Doc.findByIdAndUpdate(id, newObject)
        return NextResponse.json({ ...newObject })
    } catch (error) {
        return NextResponse.json({ error: "items can't updated" })
    }
}

export async function GET(request: Request, { params }: Params) {
    try {
        const { id } = params;

        const category = await TechModel.findById(id);
        console.log("category ID : ", category);
        const doc = await Doc.findOne({ _id: id });
        if (!doc) {
            return NextResponse.json({
                success: false,
                message: "Document not found"
            }, { status: 404 });
        }
        return NextResponse.json({
            payload: doc,
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.error("Error finding doc:", error);
        return NextResponse.json({
            error: "Internal server error",
            success: false
        }, { status: 500 });
    }
}


