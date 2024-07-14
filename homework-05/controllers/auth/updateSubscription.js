// homework-05/controllers/auth/updateSubscription.js

const User = require("../../models/user.model");
const { subscriptionSchema } = require("../../services/validation");

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

module.exports = updateSubscription;
