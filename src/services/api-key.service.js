"use strict";

const apiKeyModel = require("../models/api-key.model");
const crypto = require("node:crypto");
class ApiKeyService {
  static findByKey = async (key) => {
    const foundKey = await apiKeyModel.findOne({ key, status: true }).lean();
    return foundKey;
  };
}

module.exports = ApiKeyService;
