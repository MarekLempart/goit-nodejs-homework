// homework-04/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
// router.post("/logout", authController.logout);
router.post("/signup", authController.signup);

module.exports = router;
