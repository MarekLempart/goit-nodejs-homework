// homework-06/controllers/auth.controller.js

const login = require("./auth/login");
const logout = require("./auth/logout");
const signup = require("./auth/signup");
const getCurrentUser = require("./auth/getCurrentUser");
const updateSubscription = require("./auth/updateSubscription");
const updateAvatar = require("./auth/updateAvatar");
const resendVerificationEmail = require("./auth/resendVerificationEmail");
const verifyEmail = require("./auth/verifyEmail");

module.exports = {
  login,
  logout,
  signup,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  resendVerificationEmail,
  verifyEmail,
};
