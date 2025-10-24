const fs = require("fs");
const path = require("path");
const client = require("./config/db");

async function createTables() {
  try {
    const schemaPath = path.join(__dirname, "models/schema.sql");

    const schema = fs.readFileSync(schemaPath, "utf8");

    await client.query(schema);

    console.log("Tables created successfully (or already exist).");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  } finally {
    await client.end();
  }
}

createTables();
