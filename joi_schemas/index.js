const { registerSchema, loginSchema, updateSchema } = require("./usersSchemas");
const { taskAddSchema } = require("./tasksSchemas");
const { reviewsSchema } = require("./reviewsSchemas");

module.exports = {
  registerSchema,
  taskAddSchema,
  loginSchema,
  updateSchema,
  reviewsSchema,
};
