"use strict";

const express = require("express");
const { apiKey, checkPermissions } = require("../auth/check-auth");

const router = express.Router();
// check api key
router.use(apiKey);
router.use(checkPermissions("0000"));
router.use("/v1/api", require("./access"));

module.exports = router;
