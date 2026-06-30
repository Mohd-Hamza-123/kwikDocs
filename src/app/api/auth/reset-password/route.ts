import bcrypt from "bcrypt";
import User from "@/models/user.model";
import { saltRounds } from "@/constant";
import connectDB from "@/conf/database";
import { connectRedis } from "@/conf/redis";
import { rateLimit } from "@/lib/rateLimit";
import { NextRequest, NextResponse } from "next/server";
import { passwordMatchSchema } from "@/lib/validation/authSchema";

const LIMIT = 5;
const WINDOW = 60 * 15;

export async function POST(request: NextRequest) {
    try {

        await connectDB();
        await connectRedis();

        const body = await request.json()
        const token = request.nextUrl.searchParams.get("token")

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "token expired"
            }, { status: 400 })
        }

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            "unknown";

        const limit = await rateLimit(`auth:reset-password:${ip}`, LIMIT, WINDOW);

        if (!limit.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: limit.message,
                    retryAfter: limit.retryAfter,
                },
                {
                    status: 429,
                    // headers: {
                    //     "Retry-After": String(limit.retryAfter),
                    // },
                }
            );
        }

        const validation = passwordMatchSchema.safeParse(body)

        if (!validation.success) {
            const errors = validation.error.flatten()

            return NextResponse.json({
                success: false,
                message: "Invalid Password",
                errors
            }, { status: 400 })
        }

        const { password, confirmPassword } = validation.data

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgetPasswordTokenExpiry: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token"
            }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, saltRounds)

        const updateUser = await User.findByIdAndUpdate(user._id, {
            $set: {
                password: hashPassword,
            },
            $unset: {
                forgotPasswordToken: "",
                forgetPasswordTokenExpiry: "",
            }
        }, { new: true })

        return NextResponse.json({
            success: true,
            message: "Password Changed"
        }, { status: 200 })

    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error"
        console.log(message)
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }
}