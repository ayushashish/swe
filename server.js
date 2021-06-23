const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");

// Route files
const user = require("./routes/users");
const role = require("./routes/roles");
const school = require("./routes/schools");
const student = require("./routes/students");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/user", user);
app.use("/role", role);
app.use("/school", school);
app.use("/student", student);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server and exit process
  server.close(() => process.exit(1));
});
