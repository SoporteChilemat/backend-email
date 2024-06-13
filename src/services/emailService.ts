import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendEmailService = async (recipients: string[], subject: string, message: string, attachments: { filename: string, content: Buffer }[]) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipients, // Utilizar el array de destinatarios
        subject,
        text: message,
        attachments,
    };

    await transporter.sendMail(mailOptions);

    await prisma.email.create({
        data: {
            to: recipients.join(', '), // Guardar destinatarios como una cadena separada por comas
            subject,
            message,
        },
    });
};
