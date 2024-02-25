import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();

// API to add a review to the database
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

export default router;
