const client = require("../config/db");
const { logEvent } = require("../utils/logger");
const GetEmpStatus = async (req, res) => {
  const { NationalNumber } = req.body;

  try {
    const query = `
      SELECT u.id, u.username, u.is_active, s.year, s.month, s.salary
      FROM users u
      INNER JOIN salaries s ON u.id = s.user_id
      WHERE u.NationalNumber = $1
    `;
    const result = await client.query(query, [NationalNumber]);

    if (result.rows.length === 0) {
      await logEvent(
        "ERROR",
        "Invalid National Number",
        `NationalNumber: ${NationalNumber}`
      );

      return res.status(404).json({ error: "Invalid National Number" });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      await logEvent(
        "ERROR",
        "User is not Active",
        `NationalNumber: ${NationalNumber}`
      );
      return res.status(406).json({ error: "User is not Active" });
    }

    const salariesRows = result.rows.filter((r) => r.salary !== null);

    if (salariesRows.length < 3) {
      await logEvent(
        "ERROR",
        "INSUFFICIENT_DATA",
        `NationalNumber: ${NationalNumber}`
      );
      return res.status(422).json({ error: "INSUFFICIENT_DATA" });
    }

    const salaries = salariesRows.map((s) => parseFloat(s.salary));
    const highestSalary = Math.max(...salaries);

    let adjustedSalaries = salariesRows.map((s) => {
      let salaryNum = parseFloat(s.salary);
      if (s.month === 12) salaryNum *= 1.1;
      else if ([6, 7, 8].includes(s.month)) salaryNum *= 0.95;
      return salaryNum;
    });

    let totalSalary = adjustedSalaries.reduce((acc, val) => acc + val, 0);
    if (totalSalary > 10000) totalSalary *= 0.93;

    const averageSalary = totalSalary / adjustedSalaries.length;

    let status;
    if (averageSalary > 2000) status = "GREEN";
    else if (averageSalary === 2000) status = "ORANGE";
    else status = "RED";

    const lastUpdated = new Date().toISOString();
    await logEvent(
      "INFO",
      "Employee status retrieved successfully",
      `NationalNumber: ${NationalNumber}`
    );

    return res.status(200).json({
      username: user.username,
      NationalNumber: NationalNumber,
      highestSalary,
      averageSalary,
      status,
      IsActive: user.is_active,
      lastUpdated,
    });
  } catch (error) {
    await logEvent("ERROR", "Server Error", error.message);
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { GetEmpStatus };
