// homework-06/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const verifyEmail = require("../controllers/auth/verifyEmail");
const resendVerificationEmail = require("../controllers/auth/resendVerificationEmail");

router.post("/login", authController.login);
router.get("/logout", auth, authController.logout);
router.post("/signup", authController.signup);
router.get("/current", auth, authController.getCurrentUser);
router.patch("/subscription", auth, authController.updateSubscription);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  authController.updateAvatar
);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerificationEmail);

module.exports = router;
