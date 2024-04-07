import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();

router.post("/classroomInfo", (req, res) => {
  let connection = mysql.createConnection(config);

  const { classCode } = req.body;
  let sql = `SELECT * From Classroom Where ClassroomID = ?`;
  let data = [classCode];


  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error retrieving classroom:", error.message);
      return res.status(500).json({ error: "Error adding user: " + error.message });
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

export default router;
