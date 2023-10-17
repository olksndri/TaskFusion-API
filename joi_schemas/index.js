const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require("./users-schemas");
const { tasksSchema } = require("./tasks-schemas");
const { reviewsSchema } = require("./reviews-schemas");

module.exports = {
  registerSchema,
  tasksSchema,
  reviewsSchema,
  loginSchema,
  updateSchema,
};
