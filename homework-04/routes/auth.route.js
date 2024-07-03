// homework-04/routes/auth.route.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/signin", authController.signin);
router.post("/signout", authController.signout);
router.post("/signup", authController.signup);

module.export = router;
