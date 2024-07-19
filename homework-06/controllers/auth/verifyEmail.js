// homework-06/controllers/auth/verifyEmail.js

const User = require("../../models/user.model");

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.verify = true;
    delete user.verificationToken;
    await user.save();

    return res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = verifyEmail;
