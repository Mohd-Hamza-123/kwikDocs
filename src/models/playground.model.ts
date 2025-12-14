import { Schema, Types, InferSchemaType, HydratedDocument, model, models, Model } from "mongoose"

const playgroundSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: Types.ObjectId,
        ref: "users",
        required: true,
    },
    html: {
        type: String,
        time: true
    },
    css: {
        type: String,
        trim: true
    },
    javascript: {
        type: String,
        trim: true
    },
    python: {
        type: String,
        trim: true
    },
    views: {
        type: Number,
        default: 0,
        set: (val: number) => Math.max(0, Math.floor(val))
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export type PlaygroundType = InferSchemaType<typeof playgroundSchema>

export type PlaygroundDocument = HydratedDocument<PlaygroundType>

const Playground = (models.Playground as Model<PlaygroundType>) || model<PlaygroundType>("Playground", playgroundSchema);

export default Playground;
