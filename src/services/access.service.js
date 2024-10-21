"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const KeyTokenService = require("./key-token.service");
const { createTokenPair } = require("../auth/auth.utils");
const crypto = require("node:crypto");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static signUp = async ({ email, name, password }) => {
    try {
      // 1.Check email
      const foundShop = await shopModel.findOne({ email }).lean();
      if (foundShop)
        return {
          code: "xxx",
          message: "Email already exists",
          status: "error",
        };

      // 2. Create a new
      const hashedPassword = await bcrypt.hash(password, 10);
      const roles = [RoleShop.SHOP];
      const newShop = await shopModel.create({
        email,
        name,
        password: hashedPassword,
        roles,
      });

      if (newShop) {
        // create private key and public key
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: { type: "spki", format: "pem" },
        //   privateKeyEncoding: { type: "pkcs8", format: "pem" },
        // });

        // publickey: key secret access token
        // privateKey: key secret refresh token
        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        const keyStores = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
        if (!keyStores) {
          return {
            code: "xxx",
            message: "publicKey error",
            status: "error",
          };
        }

        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        return {
          code: 20001,
          message: "Sign up successful",
          status: "success",
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }

      return {
        code: 20001,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 50001,
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
