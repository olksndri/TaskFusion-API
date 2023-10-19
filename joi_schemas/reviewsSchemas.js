const Joi = require("joi");

const reviewsSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name, comment or rating is invalid",
  }),
  rating: Joi.number().required(),
  comment: Joi.string().required(),
});

module.exports = { reviewsSchema };
