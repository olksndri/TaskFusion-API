const fs = require("fs/promises");

const { findUserAndUpdate } = require("../service/index");
const { HttpError, cloudinary } = require("../utilities");
const { ctrlWrapper } = require("../decorators/index");
const { updateSchema } = require("../joi_schemas");

const getCurrent = (req, res) => {
  const { _id, name, email, avatar, birthday, skype, phone } = req.user;
  res.json({
    _id,
    name,
    email,
    avatar,
    birthday,
    skype,
    phone,
  });
};

const updateUser = async (req, res, next) => {
  const { error } = updateSchema.validate(req.body);

  if (error) {
    if (req.file?.path) {
      await fs.rm(req.file.path);
    }
    return next(HttpError(400, error.message));
  }

  let url;
  if (req.file?.path) {
    const options = {
      use_filename: true,
      folder: "TaskFusion_avatars",
    };
    const cloudResult = await cloudinary.uploader.upload(
      req.file.path,
      options
    );
    await fs.rm(req.file.path);
    url = cloudResult.url;
  }

  const updateResult = await findUserAndUpdate(req.user._id, {
    ...req.body,
    avatar: url,
  });
  if (!updateResult) {
    return next(HttpError(404, "Not found"));
  }
  res.json({ message: "User info successfully updated" });
};

module.exports = {
  updateUser: ctrlWrapper(updateUser),
  getCurrent: ctrlWrapper(getCurrent),
};
