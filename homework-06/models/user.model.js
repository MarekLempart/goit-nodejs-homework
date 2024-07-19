// homework-06/models/user.model.js

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
    default: function () {
      return gravatar.url(this.email, { s: "250", d: "retro" }, true);
    },
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
    default: function () {
      return this.verify ? null : uuidv4();
    },
    // default: null,
  },
});

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", user, "users");

module.exports = User;
