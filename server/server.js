let { chats } = require("./data/data");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const colors = require("colors");
const userRouter = require('./routes/user.routes');
const chatRouter = require('./routes/chat.routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config();
connectDB();
let PORT = process.env.PORT || 5000;

app.use(express.json()) // to accept json data

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.yellow.bold);
});
