import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import bodyParser from "body-parser";
import response from "express";
import OpenAI from "./api/openai.js";
import Topics from "./db/topics.js";
import SignUp from "./api/signup.js"
import LogIn from "./api/login.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));
// API to read topics from the database
app.use("/api", Topics);
//all OpenAI routes
app.use("/api", OpenAI);
//Send user info to sql
app.use("/api", SignUp);
//retrieve user info after login
app.use("/api", LogIn);


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
