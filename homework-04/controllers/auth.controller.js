// homework-04/controllers/auth.controller.js

const signin = (req, res) => {
  const { email, password } = req.body;
  // TODO: login
};

const signout = (req, res) => {
  // TODO; logout
};

const signup = (req, res) => {
  const { name, password, email, phone } = req.body;
  // TODO: registration
};

module.export = {
  signin,
  signout,
  signup,
};
