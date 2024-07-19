// homework-06/controllers/auth/login.js

const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../../services/validation");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const emailService = require("../../services/email.service");

const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      status: "validation-error",
      code: 400,
      data: {
        message: error.details[0].message,
      },
    });
  }

  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  if (
    typeof user.verify === "undefined" ||
    typeof user.verificationToken === "undefined"
  ) {
    user.verify = false;
    user.verificationToken = uuidv4();
    await user.save();
  }

  if (!user.verify) {
    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/verify/${user.verificationToken}`;
    await emailService.sendVerificationEmail(email, verificationLink);

    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Email is not verified. Verification email sent.",
    });
  }

  if (!user.avatarURL) {
    user.avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  user.token = token;
  await user.save();

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
