const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  auth0Id: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
