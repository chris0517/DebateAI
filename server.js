import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import bodyParser from "body-parser";
import response from "express";
import OpenAI from "./api/openai.js";
import Topics from "./db/topics.js";
import SignUp from "./api/signup.js";
import LogIn from "./api/login.js";
import Student from "./db/student.js";
import Classroom from "./api/addClassroom.js"
import StudentList from "./api/studentList.js"
import classroomInfo from "./api/classroomInfo.js"


import admin from "firebase-admin";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
import { checkAuth } from "./middleware.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));
// API to read topics from the database
app.use("/api", Topics);

app.use("/api", Student);
//all OpenAI routes
//Send user info to sql
app.use("/api", SignUp);
//retrieve user info after login
app.use("/api", LogIn);
//add mew classroom
app.use("/api", Classroom);
//retrieve student list
app.use("/api", StudentList)
//add classroom to Student
app.use("/api", classroomInfo)



app.use("/api", [checkAuth, OpenAI]);

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
