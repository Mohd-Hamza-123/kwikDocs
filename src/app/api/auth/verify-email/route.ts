import connectDB from "@/conf/database";
import { connectRedis } from "@/conf/redis";
import { rateLimit } from "@/lib/rateLimit";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

const LIMIT = 10;
const WINDOW = 60 * 15; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    
    await connectDB();
    await connectRedis();

    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Token",
        },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      "unknown";

    const limit = await rateLimit(
      `auth:verify-email:${ip}`,
      LIMIT,
      WINDOW
    );

    if (!limit.success) {
      return NextResponse.json(
        {
          success: false,
          message: limit.message,
          retryAfter: limit.retryAfter,
        },
        {
          status: 429,
        }
      );
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification Link Expired. Try again later",
        },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          isVerified: true,
        },
        $unset: {
          verifyToken: "",
          verifyTokenExpiry: "",
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Email Verified",
    });
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
      },
      { status: 500 }
    );
  }
}