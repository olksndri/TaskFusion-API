const Joi = require("joi");
const TIME_REGEXP = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const DATE_REGEXP = /^\d{4}-((0[1-9])|(1[012]))-((0[1-9]|[12]\d)|3[01])$/;
const timeFormat = "HH:MM";
const dateFormat = "YYYY-MM-DD";

const tasksSchema = Joi.object({
  title: Joi.string()
    .max(250)
    .required()
    .label("Title")
    .messages({ "any.required": "Title is required" }),
  start: Joi.string()
    .regex(TIME_REGEXP)
    .required()
    .label("Start time")
    .messages({
      "string.pattern.base": `Invalid start time format. Please use ${timeFormat} format.`,
      "any.required": "Start time is required.",
    }),
  end: Joi.string()
    .regex(TIME_REGEXP)
    .required()
    .label("End time")
    .messages({
      "string.pattern.base": `Invalid end time format. Please use ${timeFormat} format.`,
      "any.required": "End time is required.",
    }),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("low")
    .required(),
  date: Joi.string()
    .regex(DATE_REGEXP)
    .required()
    .label("Date")
    .messages({
      "string.pattern.base": `Invalid date format. Please use ${dateFormat} format.`,
      "any.required": "Date is required.",
    }),
  category: Joi.string().valid("to-do", "in-progress", "done").required(),
});

module.exports = tasksSchema;
