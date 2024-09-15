// MailSender.js
const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: '"Music Apps" <noreply@musicapps.com>',
      to: targetEmail,
      subject: 'Ekspor Music',
      text: 'Terlampir hasil dari ekspor music',
      attachments: [
        {
          filename: 'music.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
