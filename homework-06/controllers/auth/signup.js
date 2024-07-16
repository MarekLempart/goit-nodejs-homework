// homework-06/controllers/auth/signup.js

const User = require("../../models/user.model");
const { signupSchema } = require("../../services/validation");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = signupSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      status: "validation-error",
      code: 400,
      data: {
        message: error.details[0].message,
      },
    });
  }

  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
