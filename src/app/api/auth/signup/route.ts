import sendEmail from "@/lib/mailer";
import User from "@/models/user.model";
import connectDB from "@/conf/database";
import { VERIFY_EMAIL } from "@/constant";
import createSession from "@/lib/createSession";
import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validation/authSchema"

export async function POST(request: NextRequest) {

    try {
        await connectDB();
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
        console.log(message)
        return NextResponse.json({
            success: false,
            message
        }, { status: 500 });
    }
}

