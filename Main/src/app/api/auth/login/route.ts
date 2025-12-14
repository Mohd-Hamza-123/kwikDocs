import bcrypt from 'bcrypt'
import crypto from 'crypto'
import User from '@/models/user.model';
import connectDB from "@/dbConfig/dbConfig";
import Session from '@/models/session.model';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        await connectDB();
        const body = await request.json();

        const { email, password } = body;

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
            }, { status: 400 })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
            }, { status: 400 })
        }

        const sessionToken = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

        await Session.deleteMany({ userId: user._id });
        await Session.create({
            userId: user._id,
            sessionToken,
            expiresAt
        })

        const payload : any = { ...user.toObject() }
        delete payload.password

        const response = NextResponse.json({
            message: 'You are login',
            success: true,
            data: payload
        }, { status: 200 });

        response.cookies.set('session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiresAt,
            path: '/',
            sameSite: 'lax'
        })

        return response

    } catch (error: unknown) {
        const environment = process.env.NODE_ENV
        return NextResponse.json({
            success: false,
            message: "login failed",
            error: environment === "development" ? (error instanceof Error ? error.message : "internal server error") : "something went wrong , please try again later"
        }, { status: 500 })
    }
}