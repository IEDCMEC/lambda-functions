const fs = require('fs');
const csv = require('csv-parser');
const qrcode = require('qrcode');
const nodemailer = require('nodemailer');
const Jimp = require("jimp");


const csvFilePath = './demo.csv';
const outputDir = './qrcodes';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: '@gmail.com',
        pass: ''
    }
});

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
        const id = row.id;
        const email = row.email;
        const name = row.name;
        const qrCodeData = id;
        const qrCodePath = `${outputDir}/${id}.png`;
        try {
            await qrcode.toFile(qrCodePath, qrCodeData, {
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
                scale: 11,
                margin: 2
            });

            const qrImage = await Jimp.read(qrCodePath);
            const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
            qrImage.print(font, 130, qrImage.bitmap.height - 20, id);
            await qrImage.writeAsync(qrCodePath);
            const mailOptions = {
                from: 'nazimfilzer@gmail.com',
                to: email,
                subject: 'Welcome to TECHNOO',
                text: `SUPPP ${name}!!`,
                attachments: [
                    {
                        filename: `${id}.png`,
                        path: qrCodePath
                    }
                ]
            };

            await transporter.sendMail(mailOptions);
            console.log(`Sent QR code for id ${id} to ${email}`);

            if (counter++ % 10 === 0) {
                console.log('Pausing for 30 seconds...');
                await new Promise(resolve => setTimeout(resolve, 30000));
                console.log('Resuming...');
            }
        } catch (error) {
            console.error(`Failed to send QR code for id ${id} to ${email}: ${error}`);
        }
    })
    .on('end', () => {
        console.log('Done generating and sending QR codes');
    });

let counter = 1;
