import Doc from "@/models/docs.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const {
            tags,
            title,
            image,
            description,
            category,
            bookmark,
        } = await request.json();

        console.log({
            tags,
            title,
            image,
            category,
            bookmark,
            description,
        });


        const createdData = await Doc.create({
            description,
            category,
            bookmark,
            title,
            tags,
            image,
        });

        // console.log("Created Data:", createdData);

        return NextResponse.json({
            success: true,
            payload: createdData
        }, { status: 200 });

    } catch (error) {
        console.error("Error creating data:", error);
        return NextResponse.json({
            message: "document not created",
            success: false
        }, { status: 500 });
    }
}


export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("_id");
    try {

        await Doc.findByIdAndDelete(id);
        return NextResponse.json({ message: "Item deleted", status: 200 });
    } catch (error) {
        console.error("Error deleting doc:", error);
        return NextResponse.json({ message: "Can't be deleted", status: 400 });
    }
}