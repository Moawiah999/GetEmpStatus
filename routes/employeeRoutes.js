const express = require("express");
const { GetEmpStatus } = require("../controllers/employeeController");

const employeeRoutes = express.Router();
employeeRoutes.post("/GetEmpStatus", GetEmpStatus);
module.exports = employeeRoutes;
