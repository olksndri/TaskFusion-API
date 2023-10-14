const { User } = require("./schemas/users");

const registerUser = async (body) => {
  return User.create(body);
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports = {
  registerUser,
  findUserByEmail,
};
