const path = require("path");

const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

connectDB();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/goals", require("./routes/goalRoutes"));

// Custom Error Message
app.use(errorHandler);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    const holderPath = path.resolve(
      __dirname,
      "../",
      "frontend",
      "dist",
      "index.html"
    );
    console.log(holderPath);
    res.sendFile(holderPath);
  });
} else {
  app.get("/", (req, res) =>
    res.send("Please deploy your production files and retry again")
  );
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
