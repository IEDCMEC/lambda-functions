const fs = require("fs");
const csv = require("csv-parser");
const glob = require("glob");

const TECHNICAL_WORKSHOP_TOPIC = "technical-workshop-topic";
const NON_TECHNICAL_WORKSHOP_TOPIC = "non-technical-workshop-topic";

const accountRenamings = (obj = {}) => {
  const renameEvent = (parent = "", oldName = "", newName = "") => {
    obj[parent][newName] += obj[parent][oldName];
    delete obj[parent][oldName];
    return obj;
  };
  renameEvent(
    TECHNICAL_WORKSHOP_TOPIC,
    "No Code App Building",
    "No-Code 101: Building No-Code WebApps with CodeDesign"
  );
  renameEvent(
    TECHNICAL_WORKSHOP_TOPIC,
    "Cloud Services Workshop",
    "Linux And Cloud Fundamentals"
  );
  renameEvent(
    NON_TECHNICAL_WORKSHOP_TOPIC,
    "Growth strategies for Bootstrapped startups",
    "Cost-Effective Ways to Grow Your Self-Funded Startup"
  );

  console.log(obj);

  console.log("After removing undefined entries:\n");

  delete obj[TECHNICAL_WORKSHOP_TOPIC][undefined];
  delete obj[NON_TECHNICAL_WORKSHOP_TOPIC][undefined];

  return obj;
};

const getCount = () => {
  // const filePaths = ["csv/bothStudent.csv", "csv/workshopOnlyStudent.csv"];
  const filePaths = glob.sync("csv/**/*.csv");
  console.log(filePaths);

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
            resolve(accountRenamings(columnCounts));
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
