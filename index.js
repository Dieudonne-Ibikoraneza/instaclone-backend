import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

// Load environment variables from root folder
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "..", ".env") }); // Go up one level from backend

console.log("PORT from env:", process.env.PORT);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

// Rest of your code remains the same...
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: [process.env.URL, "http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Instaclone Backend API is running!",
    status: "success",
    endpoints: {
      auth: "/api/v1/user",
      posts: "/api/v1/post",
      messages: "/api/v1/message",
    },
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
