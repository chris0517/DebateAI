import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();


router.post("/addAssignment", (req, res) => {
    const {assignment, classCode } = req.body;
    // Create a MySQL connection
    const connection = mysql.createConnection(config);
  
    // Insert into Classroom
    const insertsql = `UPDATE Classroom SET Description = ? WHERE ClassroomID = ?;`;
    const insertdata = [assignment, classCode];
  
    connection.query(insertsql, insertdata, (error, insertResults, fields) => {
      if (error) {
        console.error("Error adding classroom:", error.message);
        return res.status(500).json({ error: "Error adding classroom: " + error.message });
      }

  
        return res.status(200).json({ success: true });
    });
    connection.end();

  });

export default router;
