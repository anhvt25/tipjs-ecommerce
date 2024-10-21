const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Api-key";
const COLLECTION_NAME = "Api-keys";
// Declare the Schema of the Mongo model
var apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME, // replace with your collection name in MongoDB
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema);
