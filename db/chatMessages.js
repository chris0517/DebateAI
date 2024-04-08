import express from "express";
import mysql from "mysql";
import config from "../config.js";
// POST /debate-history
const router = express.Router();
router.post("/insertChatMessage", (req, res) => {
  const { message, debateID, sender, timestamp } = req.body;
  let connection = mysql.createConnection(config);
  // Insert the debate into the debate_history table
  const query =
    "INSERT INTO Chat_Messages (message, debateID, Sender, Timestamp) VALUES (?, ?, ?,?)";
  const values = [message, debateID, sender, timestamp];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting debate:", err);
      res.status(500).json({ error: "An error occurred while inserting the debate" });
    } else {
      res.status(200).json({ message: "Debate inserted successfully" });
    }
  });
  connection.end();
});
//get all chat messages for a debate id
router.get("/getChatMessages", (req, res) => {
  let connection = mysql.createConnection(config);

  const { debateID } = req.query;
  console.log(req.query);
  if (!debateID) {
    return res.status(400).json({ error: "debateID is required" });
  }
  const sql = `SELECT * FROM Chat_Messages WHERE debateID = ${debateID}`;

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
