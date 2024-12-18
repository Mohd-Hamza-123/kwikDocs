import { technologyEnums } from "@/constant";
import { TechModel } from "@/models/tech.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        const data = await Promise.all(technologyEnums?.map(async (tech) => {
            
            const x = await TechModel.find({ techType: tech });
            console.log(x)
            if (x.length <= 0) return
            return {
                techType: tech,
                technologies: x,
            }
        }))

        const payload = data.filter(Boolean)
        console.log(payload)
        if (payload) {
            return NextResponse.json({
                success: true,
                message: "Data found",
                payload
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "failed to get data",
            }, { status: 400 })
        }
        
    } catch (error: any) {
        console.log("((error))--> ", error)
        return NextResponse.json({
            success: false,
            message: "failed to get data",
            error: error?.message || 'Internal server error'
        }, { status: 500 })
    }
}