const { reviewsSchema } = require("../../joi_schemas");
const { validateBody } = require("../../decorators");

const reviewsValidate = validateBody(reviewsSchema);

module.exports = {
  reviewsValidate,
};
