const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { countConnect, checkOverload } = require("./helpers/check.connect");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// init db
require("./dbs/init.mongodb");
// init error handler

// routes

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API!",
  });
});
module.exports = app;
