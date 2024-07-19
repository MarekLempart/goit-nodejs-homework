// homework-06/controllers/auth/resendVerificationEmail.js

const User = require("../../models/user.model");
const { resendEmailSchema } = require("../../services/validation");
const emailService = require("../../services/email.service");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const { error } = resendEmailSchema.validate({ email });
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

  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  }

  if (user.verify) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed",
    });
  }

  const verificationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verify/${user.verificationToken}`;
  await emailService.sendVerificationEmail(email, verificationLink);

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendVerificationEmail;
