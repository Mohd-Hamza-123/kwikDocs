import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}