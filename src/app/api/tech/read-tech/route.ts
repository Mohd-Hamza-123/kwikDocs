import connectDB from "@/dbConfig/dbConfig";
import TechModel from "@/models/tech.model";
import { NextResponse } from "next/server";

// export const dynamic = 'force-static';
// export const fetchCache = 'default-cache';
// export const revalidate = 60 * 60 * 24 * 28; // cache for 28 days

export async function GET() {
//    console.log("Hello")
    try {
        await connectDB();

        const allTech = await TechModel.distinct('techType')

        console.log(allTech);

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
        // console.log(payload);
        
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
        console.log("error : ", error?.message);
        return NextResponse.json({
            success: false,
            message: "failed to get data",
            error: error?.message || 'Internal server error'
        }, { status: 500 })
    }
}