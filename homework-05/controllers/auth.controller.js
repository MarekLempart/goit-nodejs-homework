// homework-05/controllers/auth.controller.js

const login = require("./auth/login");
const logout = require("./auth/logout");
const signup = require("./auth/signup");
const getCurrentUser = require("./auth/getCurrentUser");
const updateSubscription = require("./auth/updateSubscription");
const updateAvatar = require("./auth/updateAvatar");

module.exports = {
  login,
  logout,
  signup,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
