import { Types } from "mongoose";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isVerified: boolean;
    bookmark?: Types.ObjectId[];
    forgotPasswordToken?: string;
    forgetPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}