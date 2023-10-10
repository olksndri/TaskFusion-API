const { registerUser } = require("../service/index");
const { ctrlWrapper } = require("../decorators/index");

const registerUserCtrl = async (req, res, next) => {
  await registerUser(req.body);
  res.status(201).json({ message: "User successfully registered" });
};

module.exports = {
  registerUserCtrl: ctrlWrapper(registerUserCtrl),
};
