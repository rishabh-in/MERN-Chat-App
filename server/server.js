let { chats } = require("./data/data");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const colors = require("colors");
const userRouter = require('./routes/user.routes');

dotenv.config();
connectDB();
let PORT = process.env.PORT || 5000;

app.use(express.json()) // to accept json data
app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.yellow.bold);
});
