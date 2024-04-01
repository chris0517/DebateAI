import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();

// API to get a topics to the database
router.post("/getTopics", (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM Topics`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.log("error: ", error);
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

router.post("/addTopic", (req, res) => {
  let connection = mysql.createConnection(config);

  const { name } = req.body;
  let sql = `INSERT INTO Topics (Name) VALUES (?)`;
  let data = [name];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding topic:", error.message);
      return res.status(500).json({ error: "Error adding topic: " + error.message });
    }

    return res.status(200).json({ success: true });
  });
  connection.end();
});

export default router;
