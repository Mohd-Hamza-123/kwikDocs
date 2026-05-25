import crypto from 'crypto'
import { NextResponse } from 'next/server';
import Session from '@/models/session.model';
import connectDB from '@/conf/database';

async function createSession(userId: string, isMailSent?: boolean) {
    try {
        await connectDB()
        const sessionId = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24));
        // console.log(sessionId)
        // console.log(expiresAt)

        await Session.create({
            userId: userId,
            sessionId,
            expiresAt
        })

        let responseObject = { success: true } as { success: true, isMailSent?: boolean }
        if (isMailSent) {
            responseObject.isMailSent = true
        }
        const response = NextResponse.json(responseObject, { status: 200 });

        response.cookies.set('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiresAt,
            path: '/',
            sameSite: 'lax'
        })

        return response

    } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        return NextResponse.json(
            {
                success: false,
                message:
                    "Account created successfully. Please login manually.",
            },
            { status: 500 }
        );
    }
}


export default createSession