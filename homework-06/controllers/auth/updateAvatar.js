// homework-06/controllers/auth/updateAvatar.js

const User = require("../../models/user.model");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { isImageAndTransform } = require("../../services/helpers");

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "File is required",
      });
    }

    const { id } = req.user;
    const { path: temporaryPath, filename } = req.file;
    const fileExtension = path.extname(filename);
    const newFileName = `${uuidv4()}${fileExtension}`;
    const newFilePath = path.join(
      __dirname,
      "../../public/avatars",
      newFileName
    );

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

module.exports = updateAvatar;
