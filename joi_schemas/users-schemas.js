const Joi = require("joi");
const { emailRegexp, passRegexp } = require("../service/schemas");

const registerSchema = Joi.object({
  name: Joi.string().required(),

  password: Joi.string().min(6).pattern(passRegexp).required(),

  email: Joi.string()
    .pattern(emailRegexp)
    // .email({
    //   minDomainSegments: 2,
    //   tlds: { allow: ["com", "net"] },
    // })
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).pattern(passRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).optional(),
  birthday: Joi.string(),
  skype: Joi.string(),
  phone: Joi.string(),
});

module.exports = { registerSchema, loginSchema, updateSchema };
