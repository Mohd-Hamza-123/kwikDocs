import connectDB from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { TechModel } from "@/models/tech.model";
export const dynamic = 'force-dynamic';  // This forces the route to be dynamic
export const fetchCache = 'force-no-store';  // This prevents caching
export const revalidate = 0; // if 60 then data will be cached for 60 seconds
connectDB()

export async function POST(req: NextRequest, res: Response) {
    try {

        const createFields = await req.json();

        const creatingTech = new TechModel(createFields);
        const payload = creatingTech.save();

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
            })
        }
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Cannot upload tech",
            error: error?.message || 'Internal server error'
        })
    }
}