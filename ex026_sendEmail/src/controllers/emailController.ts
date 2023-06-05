import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const ping = async (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const contact = async (req: Request, res: Response) => {
    const { from, subject, email} = req.body;

    // usei o mailtrap (site) como servidor SMTP
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7b9fa35a024648",
          pass: "eb9d64a32d255e"
        }
    });

    // dica para funcilalidades como fale conosco:
    const contactUs: Mail.Options = {
        from: 'não-responda@gmail.com',
        to: 'receiver@sender.com',
        replyTo: from,
        subject: subject,
        text: email,
        html: email
    }

    // default
    const message: Mail.Options = {
        from: from,
        to: 'receiver@sender.com',
        subject: subject,
        text: email,
        html: email // if the html no succes it send the text
    }

    const info = await transporter.sendMail(contactUs);
    console.log(info)
    
    res.json({succes: true});
}