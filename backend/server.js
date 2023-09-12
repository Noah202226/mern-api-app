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
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please deploy your production codes"));
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
