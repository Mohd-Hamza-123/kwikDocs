import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises"
export async function GET(req: NextRequest) {
    try {
        // const path = './src/content/sql'
        // const files = await fs.readdir(path,{withFileTypes:true})
        // console.log(files)
        // return NextResponse.json({
        //     success: true,
        //     payload : files
        // })
    } catch (error: any) {
        return NextResponse.json({
            error: error?.message,
            success: false,
            message: "Error while fetching docs"
        }, {
            status: 500
        })
    }
}