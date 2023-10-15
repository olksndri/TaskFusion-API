const bcrypt = require("bcryptjs");
const { registerUser, findUserByEmail } = require("../service/index");
const { httpError } = require("../utilities");
const { ctrlWrapper } = require("../decorators/index");

const registerUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    throw httpError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await registerUser(req.body, hashPassword);
  res.status(201).json({
    username: newUser.name,
    email: newUser.email,
    message: "User successfully registered",
  });
};

module.exports = {
  registerUserCtrl: ctrlWrapper(registerUserCtrl),
};
