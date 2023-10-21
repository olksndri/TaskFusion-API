const Joi = require("joi");

const reviewsSchema = Joi.object({
  rating: Joi.number().required(),
  review: Joi.string().required(),
});

module.exports = { reviewsSchema };
