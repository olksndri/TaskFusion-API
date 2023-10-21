const { User } = require("./schemas/users");

const registerUser = async (body, password, token) => {
  return User.create({
    ...body,
    password,
    token,
  });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserAndUpdate = async (id, body) => {
  return User.findByIdAndUpdate(id, body);
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserAndUpdate,
};
