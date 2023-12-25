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
  if (body.password !== process.env.MAILER_PASSWORD || !body.password) {
    return { status: 401, message: "Unauthorized" };
  } else {
    if (!body.toEmail) {
      return {
        status: 500,
        message: `No Reciever Email Found.`,
      };
    } else if (!body.subject) {
      return {
        status: 500,
        message: `No Subject Found.`,
      };
    } else if (!body.content) {
      return {
        status: 500,
        message: `No Content Found.`,
      };
    } else {
      try {
        const mailOptions = {
          from: "IEDC MEC Collab",
          to: body.toEmail,
          subject: body.subject,
          html: body.content,
        };
        await transporter.sendMail(mailOptions);
        return {
          status: 200,
          message: `Sent mail to ${body.toEmail} with subject ${body.subject}`,
        };
      } catch (error) {
        return {
          status: 500,
          message: `Failed to send email to ${body.toEmail} having error : ${error}`,
        };
      }
    }
  }
};

module.exports = main;
