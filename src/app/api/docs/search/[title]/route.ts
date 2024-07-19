// find substring

// import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { connectMongoDB } from "@/lib/mongodb";
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



interface Params {
    params: {
        title: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    const { title } = params;
    try {
        await connectMongoDB()
        console.log("Searching for title:", title);
        const docs = await Doc.find({ title: { $regex: title, $options: 'i' } })
        console.log("Found documents:", docs);
        if (docs.length === 0) {
            return NextResponse.json({ message: "No documents found" }, { status: 404 })
        }
        return NextResponse.json({ docs }, { status: 200 })
    } catch (error) {
        console.error("Error finding docs:", error);
        return NextResponse.json({ error: "Error Finding documents" }, { status: 500 });
    }
}
