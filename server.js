const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const AppError = require("./utils/AppError");
const globalError = require("./middleware/globalError");
const postRoute = require("./routes/postRoute");
const authController = require("./routes/authRoute");
const commentRoute = require("./routes/commentRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());
connectDB();
// app.use(express.urlencoded({ extended: true }));

// Your routes go here
app.use("/api/v1/post", postRoute);
app.use("/api/v1/auth", authController);
app.use("/api/v1/comment", commentRoute);

// 404 handler – MUST be after all routes
app.use((req, res, next) => {
  next(new AppError(`Path is not Found ${req.originalUrl}`, 400));
});

// Error handler – for any thrown or async errors
app.use(globalError);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:3000`);
});
