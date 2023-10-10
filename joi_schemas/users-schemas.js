const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),

  password: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

module.exports = { registerSchema };
