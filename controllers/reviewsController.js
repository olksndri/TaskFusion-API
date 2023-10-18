const Review = require("../service/schemas/reviews");

const { HttpError } = require("../utilities/index.js");

const { ctrlWrapper } = require("../decorators/index.js");

const getAll = async (req, res, next) => {
  const result = await Review.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Review.find({ owner: owner });
  if (!result) {
    next(HttpError(404, `Not found`));
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Review.create({ ...req.body, owner });
  res.status(201).json({
    result: result,
    message: "Review successfully added",
  });
};

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndUpdate({ owner: owner }, req.body, {
    new: true,
  });
  if (!result) {
    next(HttpError(404, "Not found"));
  }

  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndDelete(owner);
  if (!result) {
    next(HttpError(404, "Not found"));
  }

  res.json({
    message: "Review successfully deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
