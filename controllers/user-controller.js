const fs = require("fs/promises");

const { findUserAndUpdate } = require("../service/index");
const { HttpError, cloudinary } = require("../utilities");
const { ctrlWrapper } = require("../decorators/index");
const { User } = require("../service/schemas/users");

const getCurrent = (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};

const updateUser = async (req, res, next) => {
  const result = await User.findOneAndUpdate(req.user._id, req.body, {
    new: true,
  });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json({ message: "User data changed" });
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
  testController: ctrlWrapper(testController),
  updateUser: ctrlWrapper(updateUser),
  getCurrent: ctrlWrapper(getCurrent),
};
