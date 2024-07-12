// homework-05/controllers/auth.controller.js
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  signupSchema,
  loginSchema,
  subscriptionSchema,
} = require("../services/validation");
const gravatar = require("gravatar");
// const Jimp = require("jimp");
const fs = require("fs").promises;
const path = require("path");
const { isImageAndTransform } = require("../services/helpers");

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

const logout = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    user.token = null;
    await user.save();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

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
    const newUser = new User({ email, password, avatarURL });
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

const getCurrentUser = async (req, res) => {
  try {
    const { email, subscription, avatarURL } = req.user;
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;

    const { error } = subscriptionSchema.validate({ subscription });
    if (error) {
      return res.status(400).json({
        status: "validation-error",
        code: 400,
        data: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { id } = req.user;
    const { path: temporaryPath, filename } = req.file;
    const fileExtension = path.extname(filename);
    const newFileName = `${id}${fileExtension}`;
    const newFilePath = path.join(__dirname, "../public/avatars", newFileName);

    const isImageValid = await isImageAndTransform(temporaryPath);
    if (!isImageValid) {
      await fs.unlink(temporaryPath);
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid image file",
      });
    }

    await fs.rename(temporaryPath, newFilePath);
    const avatarURL = `/avatars/${newFileName}`;
    await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// const updateAvatar = async (req, res) => {
//   const { id } = req.user;
//   const { path: tempPath, originalname } = req.file;

//   try {

//     const extension = path.extname(originalname);
//     const fileName = `${id}${extension}`;
//     const avatarPath = path.join("public/avatars", fileName);

//     const image = await Jimp.read(tempPath);
//     await image.resize(250, 250).writeAsync(avatarPath);
//     await fs.unlink(tempPath);

//     const avatarURL = `/avatars/${fileName}`;
//     await User.findByIdAndUpdate(id, { avatarURL });

//     return res.status(200).json({
//       status: "success",
//       code: 200,
//       data: { avatarURL },
//     });
//   } catch (error) {
//     await fs.unlink(tempPath);
//     return res.status(500).json({
//       status: "error",
//       code: 500,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  login,
  logout,
  signup,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
