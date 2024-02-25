import mysql from "mysql";
import config from "./config.js";
import fetch from "node-fetch";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import bodyParser from "body-parser";
import response from "express";
import OpenAI from "./api/openai.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));
// API to read topics from the database
app.post("/api/getTopics", (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM Topics`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});
//all OpenAI routes
app.use("/api", OpenAI);

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
