const Joi = require("joi");
const TIME_REGEXP = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const DATE_REGEXP = /^\d{4}-((0[1-9])|(1[012]))-((0[1-9]|[12]\d)|3[01])$/;
const timeFormat = "HH:MM";
const dateFormat = "YYYY-MM-DD";

const taskAddSchema = Joi.object({
  title: Joi.string()
    .max(250)
    .required()
    .label("title")
    .messages({ "any.required": "Title is required" }),
  start: Joi.string()
    .regex(TIME_REGEXP)
    .required()
    .label("start")
    .messages({
      "string.pattern.base": `Invalid start time format. Please use ${timeFormat} format.`,
      "any.required": "Start time is required.",
    }),
  end: Joi.string()
    .regex(TIME_REGEXP)
    .required()
    .label("end")
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
    .label("date")
    .messages({
      "string.pattern.base": `Invalid date format. Please use ${dateFormat} format.`,
      "any.required": "Date is required.",
    }),
  category: Joi.string().valid("to-do", "in-progress", "done").required(),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string().max(250).label("title"),
  start: Joi.string()
    .regex(TIME_REGEXP)
    .label("start")
    .messages({
      "string.pattern.base": `Invalid start time format. Please use ${timeFormat} format.`,
    }),
  end: Joi.string()
    .regex(TIME_REGEXP)
    .label("end")
    .messages({
      "string.pattern.base": `Invalid end time format. Please use ${timeFormat} format.`,
    }),
  priority: Joi.string().valid("low", "medium", "high"),
  date: Joi.string()
    .regex(DATE_REGEXP)
    .label("date")
    .messages({
      "string.pattern.base": `Invalid date format. Please use ${dateFormat} format.`,
    }),
  category: Joi.string().valid("to-do", "in-progress", "done"),
}).or("title", "start", "end", "priority", "date", "category");

module.exports = { taskAddSchema, taskUpdateSchema };
