import connectDB from "@/conf/database";
import { NextResponse, NextRequest } from "next/server";
import TechModel from "@/models/tech.model";
import uploadImage from "@/lib/imageConfig/imageUpload";


export async function POST(request: NextRequest) {
    try {

        await connectDB()
        const formData = await request.formData();
        
        const folder = formData.get("folder");
        const name = formData.get("name") || ""
        const techType = formData.get("techType") || ""
        const image = formData.get("image") as File || null
        const description = formData.get("description") || ""
        const folderString: string = typeof folder === "string" ? folder : "";
        
        const x: string = typeof folder === "string" ? folder : "";

        const imageObject = await uploadImage(image, x);

        const creatingTech = new TechModel({
            name,
            description,
            image: imageObject,
            techType
        });

        // console.log(creatingTech)
        const payload = await creatingTech.save();

        if (!payload) {
            return NextResponse.json({
                success: false,
                message: "cannot upload tech"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            payload: payload
        }, {
            status: 200,
        })

    } catch (error) {

        console.log("((error))--> ", error instanceof Error ? error.message : error)

        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        }, { status: 500 })
    }
}