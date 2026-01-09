import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
    {
        service:"Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    }
)
const sendEmail = async ({from,to, subject, text}) =>
{
    await transporter.sendEmail({from, to, subject, text})
}

export default sendEmail
