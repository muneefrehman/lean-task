const fs = require("fs");
const csv = require("csv-parser");

/**
 * Loads a CSV file and returns a Promise that resolves to an array of objects.
 * @param {string} filePath - Path to the CSV file.
 * @returns {Promise<object[]>}
 */

function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

module.exports = loadCSV;
