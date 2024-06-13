import { Request, Response } from 'express';
import { sendEmailService } from '../services/emailService';

export const sendEmail = async (req: Request, res: Response) => {
    const { to, subject, message } = req.body;

    console.log('to', to);
    console.log('subject', subject);
    console.log('message', message);

    const attachments = req.files ? (req.files as Express.Multer.File[]).map(file => ({
        filename: file.originalname,
        content: file.buffer,
    })) : [];

    let recipients: string[];

    try {
        recipients = JSON.parse(to); // Convertir de vuelta a array
    } catch (error) {
        return res.status(400).json({ error: 'Invalid recipients format' });
    }

    try {
        await sendEmailService(recipients, subject, message, attachments);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
};
