const { User } = require("./schemas/users");

const registerUser = async (body, password, token) => {
  return User.create({
    ...body,
    password,
  });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserById = async (_id) => {
  return User.findOne({ _id });
};

const updateUserByEmail = async (email, updObj) => {
  return User.findOneAndUpdate({ email }, updObj);
};

const findUserAndUpdate = async (id, body) => {
  return User.findByIdAndUpdate(id, body);
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserAndUpdate,
  findUserById,
  updateUserByEmail,
};
