import mongoose, { Schema } from "mongoose";

const playgroundSchema = new Schema(
    {
        userId : {
            type : mongoose.Types.ObjectId,
            required : true,
            ref : "UserModel"
        },
        title: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)


const Playground = mongoose.models.Playground || mongoose.model("Playground", playgroundSchema)

export default Playground