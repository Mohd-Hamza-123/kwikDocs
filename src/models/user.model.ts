import mongoose, { Schema, Types } from "mongoose";

interface IUser {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    bookmark?: Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    bookmark: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doc'
        }
    ],

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
},
    {
        timestamps: true
    })

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel

