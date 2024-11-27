
import mongoose, { Schema, Document } from "mongoose";

// Define the Schema
interface TagInterface {
    value: string
    label: string
}

interface BookMarkInterface {
    bookmarkID: string
    bookmarkName: string
}

interface docsInterface extends Document {
    title: string
    description: string
    image: string
    tags: TagInterface[]
    category: string,
    bookmark: BookMarkInterface[]
}
const tagScheema = new Schema<TagInterface>(
    {
        value: { type: String, required: true },
        label: { type: String, required: true },
    },
    {
        id: false
    }
)
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
        title: { type: String, required: true },
        description: { type: String, required: false },
        image: { type: String, required: false },
        tags: { type: [tagScheema], required: false },
        category: { type: String, required: true },
        bookmark: { type: [bookMarkScheema], required: false }
    },
    {
        timestamps: true
    }
);

// Create and export the model
const Doc = mongoose.models.Doc || mongoose.model<docsInterface>("Doc", docSchema);
export default Doc;
