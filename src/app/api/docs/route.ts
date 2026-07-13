import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const value = searchParams.get("value")

        // const result = 

    } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        return NextResponse.json({
            message: "Internal Server Error",
        }, { status: 500 })
    }
}