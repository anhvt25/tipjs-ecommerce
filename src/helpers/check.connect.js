"use strict";

const mongoose = require("mongoose");
const _SECONDS = 5000;
const os = require("os");
const process = require("process");

const countConnect = () => {
  const numConnections = mongoose.connections.length;
  return numConnections;
};

const checkOverload = () => {
  setInterval(() => {
    const numConnections = countConnect();
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5;

    console.log(`Active connections: ${numConnections}`);
    console.log(`Memory used: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnections > maxConnections) {
      console.log("connection overload");
      // send error message
    }
  }, _SECONDS);
};
module.exports = {
  countConnect,
  checkOverload,
};
