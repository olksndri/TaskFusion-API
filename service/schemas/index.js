const hooks = require("./hooks.js");
const review = require("./reviews.js");
const { user, emailRegexp, passRegexp } = require("./users.js");
const tasks = require("./tasks.js");

module.exports = {
  hooks,
  review,
  user,
  emailRegexp,
  passRegexp,
  tasks
};
