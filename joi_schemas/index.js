const { registerSchema, loginSchema, updateSchema } = require("./usersSchemas");
const { tasksSchema } = require("./tasksSchemas");
const { reviewsSchema } = require("./reviewsSchemas");

module.exports = {
  registerSchema,
  tasksSchema,
  loginSchema,
  updateSchema,
  reviewsSchema,
};
