import sendEmail from "@/lib/mailer";
import connectDB from "@/dbConfig/dbConfig";
import UserModel from "@/models/user.model";
import hashPassword from "@/lib/HashPassword";
import { type_Verify_Email } from "@/constant";
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
            }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            return NextResponse.json({
                success: false,
                message: "something went wrong while signIn."
            }, { status: 400 })
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
        });

        return NextResponse.json({
            success: true,
            message: 'successfully registered',
            payload: response
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: true,
            message: 'successfully registered',
            error: error?.message || error
        }, { status: 500 })
    }
}

