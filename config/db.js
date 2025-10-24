const { Client } = require("pg");
require("dotenv").config();

async function createDatabaseIfNotExists() {
  const tempClient = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

  try {
    await tempClient.connect();
    await tempClient.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
    console.log(`Database "${process.env.DB_NAME}" created successfully.`);
  } catch (error) {
    if (error.code === "42P04") {
      console.log(`Database "${process.env.DB_NAME}" already exists.`);
    } else {
      console.error("Error creating database:", error.message);
    }
  } finally {
    await tempClient.end();
  }
}
// (async () => {
//   await createDatabaseIfNotExists();
// })();
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

(async () => {
  try {
    await client.connect();
    console.log(`Connected to database "${process.env.DB_NAME}" successfully`);
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

module.exports = client;
