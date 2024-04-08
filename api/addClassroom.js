import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();


router.post("/generateClassroom", (req, res) => {
  const { classCode, email, classroomName } = req.body;
  console.log("api:", classCode);
  // Create a MySQL connection
  const connection = mysql.createConnection(config);

  // Insert into Classroom
  const insertsql = `INSERT INTO Classroom (ClassroomID, Title) VALUES (?, ?)`;
  const insertdata = [classCode, classroomName];

  connection.query(insertsql, insertdata, (error, insertResults, fields) => {
    if (error) {
      console.error("Error adding classroom:", error.message);
      return res.status(500).json({ error: "Error adding classroom: " + error.message });
    }

    // Update User only if Classroom insertion is successful
    const updatesql = 'UPDATE User SET ClassroomID = ? WHERE Email = ?';
    const updatedata = [classCode, email];

    connection.query(updatesql, updatedata, (updateError, updateResults, updateFields) => {
      connection.end(); // Close the MySQL connection

      if (updateError) {
        console.error("Error updating user classroomID:", updateError.message);
        return res.status(500).json({ error: "Error updating user classroomID: " + updateError.message });
      }

      return res.status(200).json({ success: true });
    });
  });
});


export default router;
