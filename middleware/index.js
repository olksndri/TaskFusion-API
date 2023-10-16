const {
  registerValidateBody,
  loginValidateBody,
} = require("./validation/auth-validaton");
const { auth, createToken } = require("./auth");

module.exports = {
  registerValidateBody,
  loginValidateBody,
  auth,
  createToken,
};
