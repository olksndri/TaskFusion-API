const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  registerUser,
  findUserByEmail,
  updateUserByEmail,
} = require("../service/index");
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

  const registeredUser = await registerUser(req.body, hashPassword);

  const payload = {
    id: registeredUser._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await updateUserByEmail(email, { token });

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

  // const { _id: id, email, name } = user;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  const result = await User.findByIdAndUpdate(user._id, { token });

  const userData = {
    _id: result._id,
    email: result.email,
    name: result.name,
    avatar: result.avatar,
    birthday: result.birthday,
    skype: result.skype,
    phone: result.phone,
  };

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
