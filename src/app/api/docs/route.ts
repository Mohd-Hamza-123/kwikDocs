import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Doc from "@/models/docs.model";



export async function GET(request: Request) {
    try {
        await connectMongoDB()
        const Docs = await Doc.find()
        return NextResponse.json({ Docs })
    } catch (error) {
        return NextResponse.json({ Error: "Error Occured", status: 400 })
    }

}




export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("request body: ", body);

        const { title, description, tags, category, image, bookmark } = body;

        const data = await connectMongoDB();
        // console.log("MongoDB connected:", data);

        const createdData = await Doc.create({ title, description, tags, category, image, bookmark });
        console.log("Created Data:", createdData);

        return NextResponse.json({ title, description, tags, category, image, bookmark });
    } catch (error) {
        console.error("Error creating data:", error);
        return NextResponse.json({ message: "Message not sent" });
    }
}


export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("_id");
    try {
        await connectMongoDB();
        await Doc.findByIdAndDelete(id);
        return NextResponse.json({ message: "Item deleted", status: 200 });
    } catch (error) {
        console.error("Error deleting doc:", error);
        return NextResponse.json({ message: "Can't be deleted", status: 400 });
    }
}

