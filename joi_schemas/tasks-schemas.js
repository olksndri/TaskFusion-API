const Joi = require("joi");
const TIME_REGEXP = /^([01]\d|2[0-3]):([0-5]\d)$/;
const DATE_REGEXP =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;
const timeFormat = "HH:MM";
const dateFormat = "YYYY-MM-DD";

const tasksSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string()
    .pattern(TIME_REGEXP)
    .required()
    .error(new Error(`Invalid time format. Expected format: ${timeFormat}`))
    .required(),
  end: Joi.string()
    .pattern(TIME_REGEXP)
    .required()
    .error(new Error(`Invalid time format. Expected format: ${timeFormat}`))
    .required(),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("low")
    .required(),
  date: Joi.string()
    .pattern(DATE_REGEXP)
    .required()
    .error(new Error(`Invalid date format. Expected format: ${dateFormat}`))
    .required(),
  category: Joi.string().valid("to-do", "in-progress", "done").required(),
});

module.exports = { tasksSchema };
