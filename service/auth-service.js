const { User } = require("./schemas/users");

const registerUser = async (body, pass) => {
  return User.create({ ...body, password: pass });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports = {
  registerUser,
  findUserByEmail,
};
