const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure:false,
  pool: true,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
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
    return(`Sent mail to ${body.toEmail} with subject ${body.subject}`);
  } catch (error) {
    return(
      `Failed to send email to ${body.toEmail} having error : ${error}`
    );
  }
};


module.exports = main;
