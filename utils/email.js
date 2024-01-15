import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { content } from "./content.js"

export const sendEmail = ({ sender, email, username, resetLink }) => {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

  mg.messages.create(
    process.env.MAILGUN_DOMAIN,
    {
      from: `Credentials Manager ${sender}`,
      to: email,
      subject: "Password Reset on moviesnodejs",
      html: content(username, resetLink)
    }
  )
}