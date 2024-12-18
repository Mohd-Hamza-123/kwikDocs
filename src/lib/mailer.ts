import bcrypt from 'bcrypt'
import conf from '@/conf/conf';
import nodemailer from 'nodemailer'
import UserModel from '@/models/user.model';

import {
    saltRounds,
    type_Reset_Email,
    type_Verify_Email
} from '@/constant';

interface I_Email {
    email: string;
    emailType: string;
    userId: string;
}

const sendEmail = async ({ email, emailType, userId }: I_Email) => {
    try {

        const salt = await bcrypt.genSalt(saltRounds);
        const token = await bcrypt.hash(userId, salt);

        if (emailType === type_Verify_Email) {
            await UserModel.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyTokenExpiry: Date.now() + (1000 * 60 * 60)
            })
        } else if (emailType === type_Reset_Email) {
            await UserModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgetPasswordTokenExpiry: Date.now() + (1000 * 60 * 60 * 6)
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

        const link = emailType === type_Verify_Email ? `${conf.api_end_point}verify-email?token=${token}` : `${conf.api_end_point}forgot-password?token=${token}`
        console.log("link", link);

        const mailOptions = {
            from: conf.mail_user,
            to: email,
            subject: emailType === type_Verify_Email ? 'Verify your email' : 'Forgot password',
            text: `${emailType === type_Verify_Email ? 'Verify Email' : 'Forgot Password'}`,
            html: `<html>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                        <tr>
                            <td style="padding: 20px; text-align: center; background-color: #0044cc; color: #ffffff;">
                                <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <p style="font-size: 16px; color: #333333;">Click the button below to reset your password. If you did not request this password reset, please ignore this email.</p>
                                <a href="${link}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px;">here</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                                <p style="font-size: 14px; color: #777777; margin: 0;">If you have any questions, feel free to <a href="mailto:${conf.mail_user}" style="color: #0044cc;">${link}</a></p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions);

        // console.log(mailResponse)
        return mailResponse
    } catch (error: any) {
        console.log(error?.message);
    }
}

export default sendEmail