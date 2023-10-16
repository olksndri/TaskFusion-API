const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");

const {
  registerUser,
  findUserByEmail,
  findUserAndUpdate,
} = require("../service/index");
const { HttpError, cloudinary } = require("../utilities");
const { ctrlWrapper } = require("../decorators/index");
const { User } = require("../service/schemas/users");

const { JWT_SECRET } = process.env;

const registerUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await registerUser(req.body, hashPassword);
  res.status(201).json({
    username: newUser.name,
    email: newUser.email,
    message: "User successfully registered",
  });
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;

  const payload = {
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({ token });
};

const getCurrent = (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

const signout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success" });
};

const testController = async (req, res, next) => {
  // ! Working with cloud
  const { path } = req.file;
  const options = {
    use_filename: true,
    folder: "TaskFusion_avatars",
  };
  const result = await cloudinary.uploader.upload(path, options);
  await fs.rm(path);
  const url = result.secure_url;
  await findUserAndUpdate(req.user._id, url);
  // ! Working with cloud
};

module.exports = {
  registerUserCtrl: ctrlWrapper(registerUserCtrl),
  loginCtrl: ctrlWrapper(loginCtrl),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  testController: ctrlWrapper(testController),
};
