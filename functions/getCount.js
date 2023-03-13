const fs = require("fs");
const csv = require("csv-parser");

const getCount = () => {
  const filePaths = ["csv/bothStudent.csv", "csv/workshopOnlyStudent.csv"];
  const filterColumns = [
    "technical-workshop-topic",
    "non-technical-workshop-topic",
  ];

  const columnCounts = {};
  filterColumns.forEach((column) => {
    columnCounts[column] = {};
  });

  return new Promise((resolve, reject) => {
    let count = 0;
    filePaths.forEach((filePath) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          filterColumns.forEach((column) => {
            const value = row[column];
            if (!columnCounts[column][value]) {
              columnCounts[column][value] = 0;
            }
            columnCounts[column][value]++;
          });
        })
        .on("end", () => {
          count++;
          if (count === filePaths.length) {
            columnCounts["technical-workshop-topic"][
              "No-Code 101: Building No-Code WebApps with CodeDesign"
            ] +=
              columnCounts["technical-workshop-topic"]["No Code App Building"];
            delete columnCounts["technical-workshop-topic"][
              "No Code App Building"
            ];
            resolve(columnCounts);
          }
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  });
};
getCount().then((res) => console.log(res));
module.exports = getCount;
