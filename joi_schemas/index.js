const { registerSchema, loginSchema } = require("./users-schemas");
const { taskSchema } = require("./tasks-schemas");
const { reviewsSchema } = require("./reviews-schemas");


module.exports = { registerSchema, taskSchema, reviewsSchema, loginSchema };
