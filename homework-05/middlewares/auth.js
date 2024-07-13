// homework-05/middlewares/auth.js

// const passport = require("passport");
// const User = require("../models/user.model");

// module.exports = async (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, async (error, user) => {
//     if (!user || error) {
//       return res.status(401).json({
//         status: "error",
//         code: 401,
//         message: "Unauthorized",
//         data: "Unauthorized",
//       });
//     }

//     const currentUser = await User.findById(user.id);
//     if (!currentUser || !currentUser.token) {
//       return res.status(401).json({
//         status: "error",
//         code: 401,
//         message: "Unauthorized",
//         data: "Unauthorized",
//       });
//     }

//     req.user = user;
//     next();
//   })(req, res, next);
// };

const passport = require("passport");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (error, user) => {
    if (error) {
      console.log("Authentication error:", error);
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    if (!user) {
      console.log("User not found or token invalid");
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    const currentUser = await User.findById(user.id);
    if (!currentUser || !currentUser.token) {
      console.log("Token not found or user not logged in");
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};
