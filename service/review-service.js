const Review = require("./schemas/reviews");

const findReviewByOwner = async (owner) => {
  return Review.findOne({ owner });
};

module.exports = {
  findReviewByOwner,
};
