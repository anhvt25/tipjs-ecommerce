"use strict";

const keyTokenModel = require("../models/key-token.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const keyToken = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return keyToken ? keyToken.publicKey : null;
    } catch (error) {
      throw new Error("Error creating key token: ", error.message);
    }
  };
}

module.exports = KeyTokenService;
