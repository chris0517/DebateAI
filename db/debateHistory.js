import express from "express";
import mysql from "mysql";
import config from "../config.js";
// POST /debate-history
const router = express.Router();
router.post("/insertDebate", (req, res) => {
  const { debateID, topicID, userID } = req.body;
  console.log("Inserting debate:", topicID, userID, debateID);
  let connection = mysql.createConnection(config);
  // Insert the debate into the debate_history table
  const query = "INSERT INTO Debate_History (debateID, topicID, userID) VALUES (?, ?, ?)";
  const values = [debateID, topicID, userID];

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

//get debates joined with topics table to get topic name for a user
//find all debates for a user
router.get("/getDebates", (req, res) => {
  let connection = mysql.createConnection(config);

  const { userID } = req.query;
  console.log(req.query);
  if (!userID) {
    return res.status(400).json({ error: "userID is required" });
  }
  const sql = `SELECT Debate_History.debateID, Debate_History.topicID, Debate_History.userID, Topics.title as title, Topics.banner_img as image FROM Debate_History JOIN Topics ON Debate_History.topicID = Topics.topic_id where Debate_History.userID = ${userID}`;

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
