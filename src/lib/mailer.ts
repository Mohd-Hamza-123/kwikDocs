import crypto from "crypto"
import conf from '@/conf/conf';
import nodemailer from 'nodemailer'
import User from '@/models/user.model';
import { VERIFY_EMAIL, RESET_PASSWORD, template } from '@/constant';

interface Email {
    email: string;
    emailType: string;
    userId: string;
}

const sendEmail = async ({ email, emailType, userId }: Email) => {
    try {
        const endPoint = process.env.NODE_ENV === "development" ? "http://localhost:3000" : conf.api_end_point
        const token = crypto.randomBytes(32).toString("hex")

        if (emailType === VERIFY_EMAIL) {
            await User.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyTokenExpiry: Date.now() + (1000 * 60 * 60)
            })
        } else if (emailType === RESET_PASSWORD) {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgetPasswordTokenExpiry: Date.now() + (1000 * 60 * 5)
            })
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: conf.mail_user,
                pass: conf.mail_password
            }
        });

        let link = ""
        let subject = ""
        let html = ""

        switch (emailType) {
            case VERIFY_EMAIL:
                link = `${endPoint}/verify-email?token=${token}`
                subject = 'Verify your email'
                html = template.verifyEmail(link)
                break
            case RESET_PASSWORD:
                link = `${endPoint}/reset-password?token=${token}`
                subject = 'Reset password'
                html = template.resetPassword(link)
                break
        }

        const mailOptions = {
            from: conf.mail_user,
            to: email,
            subject,
            html,
        }

        const response = await transporter.sendMail(mailOptions);
        const isSuccess = response.accepted.length > 0 && response.rejected.length === 0

        if (!isSuccess) {
            return {
                success: false,
                message: `Email Not Sent`
            }
        }

        return {
            success: true,
            message: "Email Sent"
        }

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "mail not sent"
        console.error(error instanceof Error ? error.message : "mail not sent");
        return {
            success: false,
            message,
        }
    }
}

export default sendEmail