const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const userRoutes = require("./routes/userroutes.js");
const authRoutes = require("./routes/auth");

dotenv.config();

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB is connected");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.listen(8080, () => {
  console.log("backend server started");
});
