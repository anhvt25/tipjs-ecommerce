"use strict";
const jwt = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    // verify that the refresh token
    jwt.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`decoded: ${decode}`);
      }
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
