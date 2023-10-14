const Joi = require("joi");

const reviewsSchema = Joi.object({
    name: Joi.string().required(),
    photo: Joi.string().required(),
    rating: Joi.number().required(),
    review: Joi.string().required(),
});

module.exports = { reviewsSchema };
