const Review = require("../service/schemas/reviews");

const { HttpError } = require("../utilities/index.js");

const { ctrlWrapper } = require("../decorators/index.js");

const { findReviewByOwner, findAllUsers } = require("../service/index");

const getAll = async (req, res, next) => {
  const reviews = await Review.find();
  const users = await findAllUsers();

  const result = reviews.map((review) => {
    const { name } = users.find((user) => {
      return String(user._id) === String(review.owner);
    });
    return {
      name,
      _id: review._id,
      owner: review.owner,
      comment: review.comment,
      rating: review.rating,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  });

  res.json(result);
};

const getById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Review.findOne({ owner: owner });
  if (!result) {
    return next(HttpError(404, `Not found`));
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;

  const isReviewExists = await findReviewByOwner(owner);
  if (isReviewExists) {
    return next(HttpError(409, "User already added review"));
  }

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
    return next(HttpError(404, "Not found"));
  }

  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndDelete({ owner });

  if (!result) {
    return next(HttpError(404, "Not found"));
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
