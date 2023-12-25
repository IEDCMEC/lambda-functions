const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  pool: true,
  auth: {
    user: process.env.adminEmail,
    pass: process.env.adminPassword,
  },
});

const main = async (body) => {
  try {
    const mailOptions = {
      from: "iedcmec@mec.ac.in",
      to: body.toEmail,
      subject: body.subject,
      html: body.content,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Sent mail to ${body.toEmail} with subject ${body.subject}`);
  } catch (error) {
    console.error(
      `Failed to send email to ${body.toEmail} having error : ${error}`
    );
  }
};

module.exports = main;
