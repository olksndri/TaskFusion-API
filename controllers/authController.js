const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerUser, findUserByEmail } = require("../service/index");
const { HttpError } = require("../utilities");
const { ctrlWrapper } = require("../decorators/index");
const { User } = require("../service/schemas/users");

const { JWT_SECRET, FRONTEND_URL } = process.env;

const registerUserCtrl = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    return next(HttpError(409, "Email already exist"));
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const payload = {
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await registerUser(req.body, hashPassword, token);

  const userData = { name, email };

  res.status(201).json({
    message: "User successfully registered",
    userData,
    token,
  });
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return next(HttpError(401, "Email or password is wrong"));
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return next(HttpError(401, "Email or password is wrong"));
  }

  const { _id: id, email: mail, name } = user;

  const userData = { name, mail };

  const payload = {
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({ token, userData });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).end();
};

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`${FRONTEND_URL}/login?token=${token}`);
};

module.exports = {
  registerUserCtrl: ctrlWrapper(registerUserCtrl),
  loginCtrl: ctrlWrapper(loginCtrl),
  signout: ctrlWrapper(signout),
  googleAuth: ctrlWrapper(googleAuth),
};