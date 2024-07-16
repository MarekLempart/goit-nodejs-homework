// homework-06/controllers/auth/logout.js

const User = require("../../models/user.model");

const logout = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user.avatarURL) {
      user.avatarURL = "";
    }
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

module.exports = logout;
