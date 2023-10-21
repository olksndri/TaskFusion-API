const Joi = require("joi");

const reviewsSchema = Joi.object({
  rating: Joi.number().required(),
  comment: Joi.string().required(),
});

module.exports = { reviewsSchema };
