import connectDB from "@/dbConfig/dbConfig";
import TechModel from "@/models/tech.model";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';  // This forces the route to be dynamic
export const fetchCache = 'force-no-store';  // This prevents caching
export const revalidate = 0; // if 60 then data will be cached for 60 seconds

export async function GET(request: NextRequest) {
    await connectDB();
    try {

        const allTech = await TechModel.find({}, { techType: 1, _id: 0 }).distinct('techType').exec();
      
        if (!Array.isArray(allTech) || allTech?.length <= 0) {
            return NextResponse.json({
                success: false,
                message: "failed to get data",
            }, { status: 400 })
        }

        const data = await Promise.all(allTech?.map(async (tech) => {
            const technologies = await TechModel.find({ techType: tech });

            if (technologies?.length <= 0) return
            return {
                techType: tech,
                technologies,
            }
        }))

        const payload = data.filter(Boolean)

        if (payload.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Data found",
                payload,
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "failed to get data",
            }, { status: 400 })
        }

    } catch (error: any) {

        console.log("error : ",error?.message);
        return NextResponse.json({
            success: false,
            message: "failed to get data",
            error: error?.message || 'Internal server error'
        }, { status: 500 })
    }
}