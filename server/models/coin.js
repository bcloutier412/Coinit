const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
});

const Coin = mongoose.model("Coin", userSchema);

module.exports = {
  Coin
};
