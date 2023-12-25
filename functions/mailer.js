const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_EMAIL_ADDRESS,
    clientId: process.env.GMAIL_API_CLIENT_ID,
    clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
  },
});

const main = async (body) => {
  try {
    const mailOptions = {
      from: "IEDC MEC Collab",
      to: body.toEmail,
      subject: body.subject,
      html: body.content,
    };
    await transporter.sendMail(mailOptions);
    return `Sent mail to ${body.toEmail} with subject ${body.subject}`;
  } catch (error) {
    return `Failed to send email to ${body.toEmail} having error : ${error}`;
  }
};

module.exports = main;
