const Review = require("../service/schemas/index.js");

const { HttpError } = require("../utilities/index.js");

const { ctrlWrapper } =require("../decorators/index.js");

const getAll = async (req, res) => {
  const result = await Review.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { own } = req.params;
  const result = await Review.find({ owner: own });
  if (!result) {
    throw HttpError(404, `Review with id=${own} not found`);
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { own } = req.params;
  const result = await Review.findOneAndUpdate({ owner: own }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Review with id=${own} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { own } = req.params;
  const result = await Review.findOneAndDelete(own);
  if (!result) {
    throw HttpError(404, `Review with id=${own} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
