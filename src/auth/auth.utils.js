"use strict";
const jwt = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // return the tokens
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error creating token pair: ", error.message);
  }
};

module.exports = {
  createTokenPair,
};
