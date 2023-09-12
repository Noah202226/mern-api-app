const express = require("express");
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

// Routes
app.use("/api/goals", require("./routes/goalRoutes"));

//
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
