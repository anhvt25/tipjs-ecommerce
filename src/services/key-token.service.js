"use strict";

const keyTokenModel = require("../models/key-token.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const keyToken = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return keyToken
        ? {
            publicKey: keyToken.publicKey,
            privateKey: keyToken.privateKey,
          }
        : null;
    } catch (error) {
      throw new Error("Error creating key token: ", error.message);
    }
  };
}

module.exports = KeyTokenService;
