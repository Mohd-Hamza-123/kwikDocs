import { type_Verify_Email } from "@/constant";
import connectDB from "@/dbConfig/dbConfig";
import hashPassword from "@/lib/HashPassword";
import sendEmail from "@/lib/mailer";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {

    try {

        const body = await request.json();
        const { username, email, password } = body;

        const user = await UserModel.findOne({
            $or: [{ username }, { email }]
        });

        if (user) {
            return NextResponse.json({
                success: false,
                message: "User already exists",
            })
        }
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return NextResponse.json({
                success: false,
                message: "something went wrong while signIn."
            })
        }
        const createUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        const response = await createUser.save();
 
        delete response?.password

        await sendEmail({
            email,
            emailType: type_Verify_Email,
            userId: response?._id.toString()
        })

        return NextResponse.json({
            success: true,
            message: 'successfully registered',
            payload: response
        })

    } catch (error: any) {
        return NextResponse.json({
            success: true,
            message: 'successfully registered',
            error: error?.message || error
        })
    }
}

