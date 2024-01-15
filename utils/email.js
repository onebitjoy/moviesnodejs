import nodemailer from "nodemailer"
import { content } from "./content.js"

export const sendEmail = async ({ sender, email, subject, username, resetLink }) => {
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    }
  })

  const mailOptions = {
    from: `MoviesNodeJS <${sender}>`,
    to: email,
    subject: subject,
    html: content(username, resetLink)
  }

  await transport.sendMail(mailOptions)
}

// ---------------------- Mailgun
// import FormData from 'form-data';
// import Mailgun from 'mailgun.js';
// import { content } from "./content.js"

// export const sendEmail = ({ sender, email, username, resetLink }) => {
//   const mailgun = new Mailgun(FormData);
//   const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

//   mg.messages.create(
//     process.env.MAILGUN_DOMAIN,
//     {
//       from: `Credentials Manager ${sender}`,
//       to: email,
//       subject: "Password Reset on moviesnodejs",
//       html: content(username, resetLink)
//     }
//   )
// }