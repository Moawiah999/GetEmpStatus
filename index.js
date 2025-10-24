const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const employee = require("./routes/employeeRoutes");
app.use("/api", employee);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
