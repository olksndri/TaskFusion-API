const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerUser, findUserByEmail } = require("../service/index");
const { HttpError } = require("../utilities");
const { ctrlWrapper } = require("../decorators/index");
const { User } = require("../service/schemas/users");

const { JWT_SECRET } = process.env;

const registerUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    return next(HttpError(409, "Email already exist"));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await registerUser(req.body, hashPassword);
  res.status(201).json({
    message: "User successfully registered",
  });
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return next(HttpError(401, "Email or password invalid"));
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return next(HttpError(401, "Email or password invalid"));
  }

  const { _id: id } = user;

  const payload = {
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({ token });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

module.exports = {
  registerUserCtrl: ctrlWrapper(registerUserCtrl),
  loginCtrl: ctrlWrapper(loginCtrl),
  signout: ctrlWrapper(signout),
};
