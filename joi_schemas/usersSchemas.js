const Joi = require("joi");
const { emailRegexp, passRegexp } = require("../service/schemas");

const registerSchema = Joi.object({
  name: Joi.string().required(),

  password: Joi.string().min(6).pattern(passRegexp).required(),

  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email is invalid",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email is invalid",
  }),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).optional().messages({
    "string.pattern.base": "Email is invalid",
  }),
  birthday: Joi.string(),
  skype: Joi.string(),
  phone: Joi.string(),
});

module.exports = { registerSchema, loginSchema, updateSchema };
