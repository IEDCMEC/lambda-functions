const fs = require("fs");
const csv = require("csv-parser");
const qrcode = require("qrcode");
const nodemailer = require("nodemailer");
const Jimp = require("jimp");

const csvFilePath = "./demo.csv";
const outputDir = "./qrcodes";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  pool: true,
  auth: {
    user: "iedcmec@mec.ac.in",
    pass: "pass",
  },
});

let counter = 0;
const emailText = (name) => `Dear ${name},

We hope you are excited about Technohack! 
As we approach the hackathon, we want to ensure that the registration process is smooth and easy for everyone. 
Please take note of the following instructions regarding registration:

- You will receive a unique QR code as an attachment to this email.
- Please report to the registration desk with your QR code.
- Show your QR code at the counter.
- Our volunteers will scan your QR code and you will receive a name tag with a new QR code pasted on it.
- Please stick or keep your name tag safely throughout the hackathon duration.
- For dinner, snacks, breakfast, and lunch, please show your QR code at the counters.
- If you have any doubts or questions, our voluntees will be happy to assist you.

We hope this information makes the registration process easier for you. 
If you have any further questions or concerns, please feel free to reach out to us.

Best regards,

The Technohack Team`;

const main = () => {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", async (row) => {
      const id = row.id;
      const email = row.email;
      const name = row.name;
      const qrCodeData = id;
      const qrCodePath = `${outputDir}/${id}.png`;
      try {
        await qrcode.toFile(qrCodePath, qrCodeData, {
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
          scale: 11,
          margin: 2,
        });

        const qrImage = await Jimp.read(qrCodePath);
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        qrImage.print(font, 130, qrImage.bitmap.height - 20, id);
        await qrImage.writeAsync(qrCodePath);
        const mailOptions = {
          from: "iedcmec@mec.ac.in",
          to: email,
          subject: "Technohack 2023 - Registration Details",
          text: emailText(name),
          attachments: [
            {
              filename: `${id}.png`,
              path: qrCodePath,
            },
          ],
        };

        // if (counter++ % 1 === 0) {
        //   console.log("Pausing for 15 seconds...");
        //   await new Promise((resolve) => setTimeout(resolve, 15000));
        //   console.log("Resuming...");
        // }
        await transporter.sendMail(mailOptions);
        console.log(`Sent QR code for id ${id} to ${email}`);
      } catch (error) {
        console.error(
          `Failed to send QR code for id ${id} to ${email}: ${error}`
        );
      }
    })
    .on("end", () => {
      console.log("Done generating and sending QR codes");
    });
};

main();
