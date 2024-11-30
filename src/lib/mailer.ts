import nodemailer from 'nodemailer'

interface I_Email {
    email: string;
    emailType: string;
    userId: string;
}

const sendEmail = async ({ email, emailType, userId }: I_Email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOptions = {
            from: 'hamza@gmail.com',
            to: email,
            subject: emailType === 'Verification' ? 'Verify your email' : 'Reset your password',
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse
    } catch (error: any) {
        console.log(error?.message);
    }
}

export default sendEmail