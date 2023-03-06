const fs = require('fs');
const csv = require('csv-parser');
const Jimp = require('jimp');

const generateCertificate = () => {

    const random = Math.floor(100 + Math.random() * 900);
    try {
        const namesArray = [];

        fs.createReadStream('inputs/name.csv')
            .pipe(csv())
            .on('data', (row) => {
                namesArray.push(row['Names']);
            })
            .on('end', async () => {
                const certificateImage = await Jimp.read('inputs/certificate.jpg');

                for (let i = 0; i < namesArray.length; i++) {
                    const certificate = certificateImage.clone();

                    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);

                    certificate.print(
                        font,
                        certificate.bitmap.width / 2 - namesArray[i].length * 20, // x axis
                        445, // Y axis
                        namesArray[i]
                    );

                    certificate.write(`certificates/${namesArray[i]}` + random + '.jpg');
                }
            });

    } catch (error) {
        console.log(error);
    }

};

module.exports = generateCertificate;
