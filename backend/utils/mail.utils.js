import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER, // set in .env
    pass: process.env.EMAIL_PASS,
  },
});


export const sendMail = async ({ to, subject, template, data }) => {
  const templatePath = path.resolve('templates', template);

  const html = await ejs.renderFile(templatePath, data);

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};