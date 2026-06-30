import sendEmail from "@/lib/mailer";
import User from "@/models/user.model";
import connectDB from "@/conf/database";
import { VERIFY_EMAIL } from "@/constant";
import { connectRedis } from "@/conf/redis";
import { rateLimit } from "@/lib/rateLimit";
import createSession from "@/lib/createSession";
import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validation/authSchema"
const LIMIT = 3
const WINDOW = 60 * 60

export async function POST(request: NextRequest) {

    try {

        await connectDB();
        await connectRedis()
        const body = await request.json();
        const validate = signupSchema.safeParse(body);

        if (!validate.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials",
                errors: validate.error.flatten(),
            }, { status: 409 });
        }

        const { username, email, password } = validate.data;
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            "unknown";

        const key = `auth:signup:${ip}`
        
        const limit = await rateLimit(key, LIMIT, WINDOW)

        if (!limit.success) {
            return NextResponse.json(
                {
                    message: limit.message,
                    retryAfter: limit?.retryAfter
                },
                { status: 429 }
            );
        }

        const isUserExists = await User.findOne({
            $or: [{ username }, { email }]
        }, {
            _id: 1
        });

        // console.log(isUserExists)
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
        const mailResponse = await sendEmail({
            email,
            emailType: VERIFY_EMAIL,
            userId: user._id.toString()
        });

        return await createSession(String(user._id), mailResponse.success)

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error(message)
        return NextResponse.json({
            success: false,
            message
        }, { status: 500 });
    }
}

