import connectDB from "@/dbConfig/dbConfig"
import Doc from "@/models/docs.model"
import { NextResponse } from "next/server"

connectDB()

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        console.log("Request received:", req.url);
        console.log('lkj;kj')
        console.log(params)
        const { id } = params
        console.log("id", id)
        const deleteDoc = await Doc.findByIdAndDelete(id)
        if (deleteDoc) {
            return NextResponse.json({
                success: true,
                message: 'Document Deleted'
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: 'Document Not Deleted'
            }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Document Not Deleted',
            error: error?.message,
        }, { status: 500 })
    }
}