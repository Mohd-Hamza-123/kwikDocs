import { NextRequest, NextResponse } from "next/server";
import db_pool from "@/dbConfig/databaseConfig";

export async function GET(request: NextRequest) {
    try {
        const [rows] = await db_pool.query("SELECT * FROM employee")
        console.log(rows)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({ success: false, message: error })
    }
}

