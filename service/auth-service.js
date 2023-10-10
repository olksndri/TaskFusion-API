const { User } = require("./schemas/users");

const registerUser = async (body) => {
  return User.create(body);
};

module.exports = {
  registerUser,
};
