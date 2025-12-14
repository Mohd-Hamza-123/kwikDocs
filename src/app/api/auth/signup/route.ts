import sendEmail from "@/lib/mailer";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import crypto from 'crypto'
import { type_Verify_Email } from "@/constant";
import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/session.model";

export async function POST(request: NextRequest) {

    try {
        connectDB();
        const body = await request.json();
        const { username, email, password } = body;

        const isUserExists = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserExists) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            }, { status: 409 }); // 409 Conflict
        }

        const createUser = new User({
            username,
            email,
            password
        })

        const user = await createUser.save();

        const sessionToken = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

        await Session.deleteMany({ userId: user._id });
        await Session.create({
            userId: user._id,
            sessionToken,
            expiresAt
        })

        // const mailResponse = await sendEmail({
        //     email,
        //     emailType: type_Verify_Email,
        //     userId: response._id.toString()
        // });

        const response = NextResponse.json({
            // mailSuccess: mailResponse?.accepted,
            success: true,
            message: 'successfully registered',
        }, { status: 200 })

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
            message: 'something went wrong',
            error: environment === "development" ? (error instanceof Error ? error.message : "internal server error") : "something went wrong , please try again later"
        }, { status: 500 })
    }
}

