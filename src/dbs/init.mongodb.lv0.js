const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/shopDev";

mongoose
  .connect(connectString)
  .then((_) => console.log("Connected mongodb success"))
  .catch((_) => console.log("Error connecting mongodb"));

if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
