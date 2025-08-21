// find substring

// import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import connectDB from "@/dbConfig/dbConfig";
import Doc from "@/models/docs.model";
import { Regex } from "lucide-react";
import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//     const { title } = params;
//     try {
//         await connectMongoDB();
//         const docs = await Doc.find({ title: { $regex: title, $options: 'i' } });
//         return NextResponse.json({ docs }, { status: 200 });
//     } catch (error) {
//         console.error("Error finding docs:", error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }

connectDB()

interface Params {
    params: {
        title: string;
    };
}

export async function GET(request: Request,context: any) {
    const { title } = context?.params;
    try {
       
     
        const docs = await Doc.find({ title: { $regex: title, $options: 'i' } })
     
        if (docs.length === 0) {
            return NextResponse.json({ message: "No documents found" }, { status: 404 })
        }
        return NextResponse.json({ docs }, { status: 200 })
    } catch (error) {
        console.error("Error finding docs:", error);
        return NextResponse.json({ error: "Error Finding documents" }, { status: 500 });
    }
}
