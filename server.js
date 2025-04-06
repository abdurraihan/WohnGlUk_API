import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// import Routers
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import userRouter from "./routes/user.route.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
dotenv.config();

// Configure CORS options
const corsOptions = {
  origin: "https://wohngluck-deploy.onrender.com", // Your frontend's Render URL
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//use routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Global Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
