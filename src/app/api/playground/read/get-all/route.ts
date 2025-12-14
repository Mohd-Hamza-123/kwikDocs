import Playground from "@/models/playground.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId, tech , pageParam } = await request.json()
        console.log(userId, tech)
        
        const projects = await Playground.find({user : userId}).limit(10);

        return NextResponse.json({
            success: true,
            message: "Playground Projects Fetched",
            data: projects,
        })
    } catch (error: unknown) {
        const env = process.env.NODE_ENV
        return NextResponse.json({
            success: false,
            message: "Error fetching playgrounds",
            error: env === "development" ? (error instanceof Error ? error.message : "Unknown Error Occured") : "Internal Server Error"
        }, { status: 500 })
    }
}