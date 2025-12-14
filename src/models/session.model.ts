import { Schema, InferSchemaType, models, model, Model, HydratedDocument, Types } from "mongoose";

const sessionSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "users",
        required: true
    },
    sessionToken: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})


export type SessionType = InferSchemaType<typeof sessionSchema>
export type SessionDocument = HydratedDocument<SessionType>

const Session = (models.Session as Model<SessionType>) || model<SessionType>("Session", sessionSchema);

export default Session