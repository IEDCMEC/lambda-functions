const fs = require("fs")
const csv = require("csv-parser")
const qrcode = require("qrcode")
const nodemailer = require("nodemailer")
const Jimp = require("jimp")

const csvFilePath = "./bruh.csv"
//const outputDir = "./qrcodes";

// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir);
// }

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  pool: true,
  auth: {
    user: "addyouremailhere",
    pass: "addyourpasswordhere",
  },
})

let counter = 0
const emailText = (name) => `Dear ${name},
<br></br>
<br></br>
We are thrilled to extend our heartfelt congratulations to you on your well-deserved selection to our esteemed club! Your hard work, dedication, and passion have truly paid off, and it is an absolute pleasure to welcome you as a valued member of our vibrant community.
<br></br>
<br></br>
Click on the following link to join the IEDC MEC Tech Team WhatsApp Group. This group will be used to communicate with you regarding all the activities of the club.
<br></br>
<br></br>
<div style="font-size: 10px">
  <a href="https://chat.whatsapp.com/JyeXKtK8Gix35fN1IDlfBA" style="background-color: #4CAF50; color: #fff; padding: 5px 10px; text-decoration: none; border-radius: 2px; display: inline-block;">Join Group</a>
</div>
<br></br>
If you have any questions or need assistance with anything, please do not hesitate to reach out to us. We are here to support you and ensure that your journey with us is memorable and impactful.
<br></br>
<br></br>
Warm regards,
<br></br>
<br></br>
<strong>Jaison Dennis</strong><br></br>
<strong>CTO | IEDC MEC</strong><br></br>`

const main = () => {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", async (row) => {
      // const id = row.id;
      const email = row["Email ID"]
      const name = row["Name"]
      // const qrCodeData = id;
      // const qrCodePath = `${outputDir}/${id}.png`;
      try {
        //   await qrcode.toFile(qrCodePath, qrCodeData, {
        //     color: {
        //       dark: "#000000",
        //       light: "#FFFFFF",
        //     },
        //     scale: 11,
        //     margin: 2,
        //   });

        //   const qrImage = await Jimp.read(qrCodePath);
        //   const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        //   qrImage.print(font, 130, qrImage.bitmap.height - 20, id);
        //   await qrImage.writeAsync(qrCodePath);
        const mailOptions = {
          from: "iedcmec@mec.ac.in",
          to: email,
          subject: "Congratulations on Your Selection to IEDC MEC Tech Team",
          html: emailText(name),
          // attachments: [
          //   {
          //     filename: `${id}.png`,
          //     path: qrCodePath,
          //   },
          // ],
        }

        // if (counter++ % 1 === 0) {
        //   console.log("Pausing for 15 seconds...");
        //   await new Promise((resolve) => setTimeout(resolve, 15000));
        //   console.log("Resuming...");
        // }
        await transporter.sendMail(mailOptions)

        console.log(`Sent QR code for id to ${email}`)
      } catch (error) {
        console.error(`Failed to send QR code for id to ${email}: ${error}`)
      }
    })
    .on("end", () => {
      console.log("Done generating and sending QR codes")
    })
}

main()
