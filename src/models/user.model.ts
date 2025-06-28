import mongoose, { Schema } from "mongoose";
import { IUser } from "@/types/models.type";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8
    },
    bookmark: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doc'
        }
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgetPasswordTokenExpiry: {
        type: Date
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date
    }
},
    {
        timestamps: true
    })


const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel

