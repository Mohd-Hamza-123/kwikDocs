import connectDB from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import TechModel from "@/models/tech.model";
import uploadImage from "@/lib/imageConfig/imageUpload";
export const dynamic = 'force-dynamic';  // This forces the route to be dynamic
export const fetchCache = 'force-no-store';  // This prevents caching
export const revalidate = 0; // if 60 then data will be cached for 60 seconds
connectDB()

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();
        const image = formData.get("image") as File || null
        const name = formData.get("name") || ""
        const description = formData.get("description") || ""
        const techType = formData.get("techType") || ""
        const folder = formData.get("folder");
        const folderString: string = typeof folder === "string" ? folder : "";



        const imageObject = await uploadImage(image, folderString);

        

        const creatingTech = new TechModel({
            name,
            description,
            image: imageObject,
            techType
        });
        console.log(creatingTech)
        const payload = await creatingTech.save();
    
        console.log(payload)
        if (payload) {
            return NextResponse.json({
                success: true,
                payload: payload
            }, {
                status: 200,
            })

        } else {
            return NextResponse.json({
                success: false,
                message: "cannot upload tech"
            }, { status: 400 })
        }
    } catch (error: any) {
        // console.log("((error))--> ", error)
        return NextResponse.json({
            success: false,
            message: "Cannot upload tech",
            error: error?.message || 'Internal server error'
        })
    }
}