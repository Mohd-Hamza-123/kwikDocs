import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import conf from "@/conf/conf";
import UserModel from "@/models/user.model";
import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
     
        const { email, password } = body;

        const user = await UserModel.findOne({ email });
        console.log(user)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    
        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
            }, { status: 400 })
        }

        const tokenData = {
            _id: user?._id,
            email: user?.email,
            username: user?.username
        }

        const token = jwt.sign(tokenData, conf.token_secret, { expiresIn: '24h' });
        console.log(token)

        const response = NextResponse.json({
            message: 'You are login',
            success: true,
        }, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error?.message || "Internal Server Error",
        }, { status: 500 })
    }
}