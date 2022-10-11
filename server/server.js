let { chats } = require("./data/data");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();
connectDB();
let PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/chat/:id", (req, res) => {
  try {
    let { id } = req.params;
    let singleChat = chats.find((c) => c._id === id);
    res.send(singleChat);
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/chats", (req, res) => {
  try {
    res.send(chats);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.yellow.bold);
});
