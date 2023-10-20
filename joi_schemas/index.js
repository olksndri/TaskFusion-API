const { registerSchema, loginSchema, updateSchema } = require("./usersSchemas");
const { taskAddSchema, taskUpdateSchema } = require("./tasksSchemas");
const { reviewsSchema } = require("./reviewsSchemas");

module.exports = {
  registerSchema,
  taskAddSchema,
  loginSchema,
  updateSchema,
  reviewsSchema,
  taskUpdateSchema,
};
