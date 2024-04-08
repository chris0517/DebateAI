import "openai/shims/node";
import express from "express";
import OpenAI from "openai";
const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

// API to add a review to the database
router.post("/chatCompletion", async (req, res) => {
  // console.log("YEEEE");
  // console.log(req.body);

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: req.body.messages,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // console.log(chatCompletion);

  // console.log(chatCompletion.choices[0].message.content);
  res.send({ express: chatCompletion.choices[0].message.content });
});

export default router;
