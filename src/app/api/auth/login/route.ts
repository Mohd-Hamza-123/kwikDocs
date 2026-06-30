import bcrypt from 'bcrypt'
import User from '@/models/user.model';
import connectDB from "@/conf/database";

import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from '@/lib/validation/authSchema';
import createSession from '@/lib/createSession';
import { rateLimit } from '@/lib/rateLimit';
import { connectRedis } from '@/conf/redis';

const LIMIT = 5
const WINDOW = 60 * 15

export async function POST(request: NextRequest) {
    try {

        await connectDB();
        await connectRedis()
        const body = await request.json();
        const validate = loginSchema.safeParse(body)



        if (!validate.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
                errors: validate.error.flatten(),
            }, { status: 409 });
        }

        const { email, password } = validate.data

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            "unknown";

    

        const key = `auth:login:${ip}:${email}`
        const limit = await rateLimit(key, LIMIT, WINDOW)

        console.log(limit)

        if (!limit.success) {
            return NextResponse.json(
                {
                    message: limit.message,
                    retryAfter: limit?.retryAfter
                },
                { status: 429 }
            );
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
            }, { status: 400 })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // console.log("password",isPasswordCorrect)
        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
            }, { status: 400 })
        }

        return await createSession(String(user._id))

    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        console.log(message)
        return NextResponse.json({
            success: false,
            message
        }, { status: 500 });

    }
}