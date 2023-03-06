const fs = require('fs');
const csv = require('csv-parser');
const Jimp = require('jimp');

const generateCertificate = () => {
    const random = Math.floor(100 + Math.random() * 900);
    const namesArray = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream('inputs/name.csv')
            .pipe(csv())
            .on('data', (row) => {
                namesArray.push(row['Names']);
            })
            .on('end', async () => {
                try {
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

                        certificate.write(`certificates/${namesArray[i]}_${random}.jpg`);
                    }

                    resolve('Certificates generated successfully!');
                } catch (error) {
                    reject(`Error generating certificates: ${error}`);
                }
            });
    });
};

module.exports = generateCertificate;