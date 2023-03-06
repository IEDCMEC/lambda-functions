const fs = require('fs');
const csv = require('csv-parser');

const getCount = async () => {
    const filePaths = ['1.csv', '2.csv'];
    const filterColumns = ['technical-workshop-topic', 'non-technical-workshop-topic'];

    const columnCounts = {};
    filterColumns.forEach((column) => {
        columnCounts[column] = {};
    });

    return new Promise((resolve, reject) => {
        let count = 0;
        filePaths.forEach((filePath) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    filterColumns.forEach((column) => {
                        const value = row[column];
                        if (!columnCounts[column][value]) {
                            columnCounts[column][value] = 0;
                        }
                        columnCounts[column][value]++;
                    });
                })
                .on('end', () => {
                    count++;
                    if (count === filePaths.length) {
                        resolve(columnCounts);
                    }
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    });
};

module.exports = getCount;