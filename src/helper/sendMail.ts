// helper/sendMail.ts
import nodemailer from "nodemailer";

export interface EmailTemplate {
  emailTo: string;
  subject: string;
  message: string;
}

const sendMail = async (template: EmailTemplate): Promise<void> => {
  // Create a transporter (using Gmail as example)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: template.emailTo,
    subject: template.subject,
    html: template.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;