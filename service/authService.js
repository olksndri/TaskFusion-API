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

const findAllUsers = async () => {
  return User.find();
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserAndUpdate,
  findAllUsers,
};
