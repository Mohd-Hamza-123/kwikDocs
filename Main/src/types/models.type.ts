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


export type PlaygroundInput = {
  html?: string;
  css?: string;
  title: string;
  description?: string;
  user: string;
  javascript?: string;
  python?: string;
  views : number;
}
