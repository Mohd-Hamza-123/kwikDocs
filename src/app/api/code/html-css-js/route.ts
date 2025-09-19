import { NextResponse } from "next/server";
import sanitizeHtml from "@/utils/Sanitize-html"
import injectCssAndJavascriptIntoHtml from "@/utils/InjectCssIntoHtml"

export async function POST(request: Request) {
    try {
        const { html, css, javascript } = await request.json()
        const sanitizedHtml = sanitizeHtml(html)
        const finalCode = injectCssAndJavascriptIntoHtml(sanitizedHtml, css, javascript);
        const encodeFinalCode = encodeURIComponent(finalCode)
        return NextResponse.json({
            finalCode: encodeFinalCode,
            success: true,
        }, { status: 200 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                success: false,
                error: error.message,
            }, { status: 500 })
        } else {
            return NextResponse.json({
                success: false,
                error: "Something went wrong",
            }, { status: 500 })
        }
    }
}