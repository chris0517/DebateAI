import express from "express";
import mysql from "mysql";
import config from "../config.js";

const router = express.Router();

//get student
router.post("/getStudent", (req, res) => {
  let connection = mysql.createConnection(config);

  const { email } = req.body;
  let sql = `SELECT * From Student Where Email = ?`;
  let data = [email];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error retrieving student:", error.message);
      return res
        .status(500)
        .json({ error: "Error retrieving student: " + error.message });
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

export default router;
