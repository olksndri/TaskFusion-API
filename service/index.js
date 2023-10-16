const {
  registerUser,
  findUserByEmail,
  findUserAndUpdate,
} = require("./auth-service");

module.exports = { registerUser, findUserByEmail, findUserAndUpdate };
