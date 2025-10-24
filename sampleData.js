const fs = require("fs");
const path = require("path");
const client = require("./config/db");

async function seedDatabase() {
  try {
    const seedPath = path.join(__dirname, "models/sampleData.sql");

    const seedSQL = fs.readFileSync(seedPath, "utf8");

    await client.query(seedSQL);

    console.log("sample Data inserted successfully!");
  } catch (err) {
    console.error("Error inserting sample Data:", err.message);
  } finally {
    await client.end();
  }
}

seedDatabase();
