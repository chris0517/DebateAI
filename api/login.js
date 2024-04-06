import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();

router.post("/retrieveUser", (req, res) => {
  let connection = mysql.createConnection(config);

  const { email, role } = req.body;
  let sql = `SELECT * From User Where Email = ?`;
  let data = [email];
  // if (role === "Student") {
  //   sql = "SELECT * From Student Where Email = ?";
  // } else if (role === "Teacher") {
  //   sql = "SELECT * From Teacher Where Email = ?";
  // }

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error retrieving user:", error.message);
      return res.status(500).json({ error: "Error adding user: " + error.message });
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

export default router;
