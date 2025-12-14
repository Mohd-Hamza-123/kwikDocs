import { Schema, InferSchemaType, models, model, Model, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        maxlength: 40,
        unique: true
        // index: true, unique: true already creates a unique index
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
        select: false, // Mongoose will NOT return the password field when query
    },
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
    }
)

export type UserType = InferSchemaType<typeof userSchema>
export type UserDocument = HydratedDocument<UserType>

userSchema.pre("save", async function (next) {
    try {
        // console.log(this) // this is the document being saved
        // console.log("isModified : ",this.isModified("password")) // true ONLY when the password field has changed
        if (!this.isModified("password")) return next()
        const user = this as UserDocument
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        next(error as Error)
    }
})

const User = (models.users as Model<UserType>) || model<UserType>("users", userSchema);

export default User




