"use strict";

const ApiKeyService = require("../services/api-key.service");

const HEADER = {
  API_KEY: "api-key",
  AUTHORIZATION: "authorization",
};
const apiKey = async (req, res, next) => {
  const apiKey = req.headers[HEADER.API_KEY];
  if (!apiKey) {
    return res.status(401).json({
      message: "Forbidden error",
      error: "Missing API Key",
    });
  }

  try {
    const foundKey = await ApiKeyService.findByKey(apiKey);
    if (!foundKey) {
      return res
        .status(401)
        .json({ message: "Forbidden error", error: "Missing API Key" });
    }

    req.apiKey = foundKey;
    next();
  } catch (error) {
    next(error);
  }
};

const checkPermissions = (permission) => {
  return (req, res, next) => {
    const { apiKey } = req;
    if (!apiKey.permissions || apiKey.permissions.length === 0) {
      return res.status(403).json({
        message: "permissions denied",
      });
    }
    if (!apiKey.permissions.includes(permission)) {
      return res.status(403).json({
        message: "permissions denied",
      });
    }
    next();
  };
};

module.exports = {
  apiKey,
  checkPermissions,
};
