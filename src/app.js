const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { countConnect, checkOverload } = require("./helpers/check.connect");
const bodyParser = require("body-parser");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// init db
require("./dbs/init.mongodb");
// init error handler

// routes
app.use(require("./routes"));
module.exports = app;
