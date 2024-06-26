import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();

router.post("/addUser", (req, res) => {
  let connection = mysql.createConnection(config);

  const { name, email, studentNum, role, classCode } = req.body;
  let sql = ``;
  let data = [];

  if(role === "Student"){
    sql = `INSERT INTO User (Name, Email, ClassroomID, Role, StudentNumber)
    SELECT ?, ?, ?, ?, ?
    FROM Classroom
    WHERE ClassroomID = ?;`;
    data = [name, email,classCode, role, studentNum, classCode];
  }else{
    sql = `INSERT INTO User (Name, Email, Role)
    SELECT ?, ?, ?;`;
    data = [name, email, role];
  }

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding user:", error.message);
      return res.status(500).json({ error: "Error adding user: " + error.message });
    }
    let string = JSON.stringify(results);
    return res.status(200).json({  express: string });
  });

  connection.end();
});

export default router;
