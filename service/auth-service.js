const { User } = require("./schemas/users");

const registerUser = async (body, pass, token) => {
  return User.create({ ...body, password: pass, token });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserAndUpdate = async (id, avatar) => {
  return User.findByIdAndUpdate(id, { avatar });
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserAndUpdate,
};
