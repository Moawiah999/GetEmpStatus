const client = require("../config/db");

async function logEvent(log_type, message, details = null) {
  try {
    await client.query(
      `INSERT INTO logs (log_type, message, details, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [log_type, message, details]
    );
  } catch (err) {
    console.error("Failed to write log:", err.message);
  }
}

module.exports = { logEvent };
