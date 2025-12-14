import User from "@/models/user.model";
import connectDB from "@/dbConfig/dbConfig";
import Playground from "@/models/playground.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const { title, html, css, javascript, python, user: userId, description } = body
        console.log("title", title)
        // console.log(html)
        // console.log(css)
        // console.log(javascript)
        // console.log(python)
        console.log("userId", userId)
        // console.log("description", description)

        if (!userId || !title) {
            return NextResponse.json({
                success: false,
                message: "title Not Provided or Invalid User"
            }, {
                status: 201
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid User",
            }, { status: 400 })
        }

        const document = await Playground.create({
            title,
            html,
            css,
            javascript,
            python,
            user: user._id,
            description,
        })

        return NextResponse.json({
            success: true,
            message: "Code Saved",
            data: document
        }, { status: 200 })

    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            message: "Document Not Saved",
            error: error instanceof Error ? error.message : "Unknown Error Occured"
        }, { status: 400 })
    }
}