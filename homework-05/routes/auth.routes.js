// homework-05/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
// const upload = require("../middlewares/upload");
const multer = require("multer");
const path = require("path");

const tempDir = path.join(process.cwd(), "tmp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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

module.exports = router;
