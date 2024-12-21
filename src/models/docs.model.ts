
import mongoose, { Schema, Document, ObjectId } from "mongoose";


export interface BookMarkInterface {
    bookmarkID: string
    bookmarkName: string
}

export interface docsInterface extends Document {
    _id: string;
    title: string;
    description: string;
    tags?: string[];
    techType: ObjectId;
    bookmark?: BookMarkInterface[];
    index: number;
}

const bookMarkScheema = new Schema<BookMarkInterface>(
    {
        bookmarkID: { type: String, required: true },
        bookmarkName: { type: String, required: true }
    },
    {
        id: false,
    },
)

const docSchema = new Schema<docsInterface>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        tags: {
            type: [String],
            required: false
        },
        techType: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "TechModel"
        },
        bookmark: {
            type: [bookMarkScheema],
            required: false
        },
        index: {
            type: Number,
            required: true,
            default: 1
        }
    },
    {
        timestamps: true
    }
);

// Create and export the model
const Doc = mongoose.models.Doc || mongoose.model<docsInterface>("Doc", docSchema);
export default Doc;
