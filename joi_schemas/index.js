const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require("./users-schemas");
const { taskAddSchema } = require("./tasks-schemas");
const { reviewsSchema } = require("./reviews-schemas");

module.exports = {
  registerSchema,
  taskAddSchema,
  reviewsSchema,
  loginSchema,
  updateSchema,
};
