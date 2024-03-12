import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();

router.post("/addUser", (req, res) => {
  let connection = mysql.createConnection(config);

  const { name, email, studentNum, role } = req.body;
  let sql = ``;
  let data = [];
  if (role === "student") {
    sql = "INSERT INTO Student (Name, Email, StudentNumber) VALUES (?, ?, ?)";
    data = [name, email, studentNum];
  } else if (role === "teacher") {
    sql = "INSERT INTO Teacher (Name, Email) VALUES (?, ?)";
    data = [name, email];
  }
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding user:", error.message);
      return res.status(500).json({ error: "Error adding user: " + error.message });
    }

    return res.status(200).json({ success: true });
  });
  connection.end();
});

export default router;
