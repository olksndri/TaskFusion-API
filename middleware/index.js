const {
  registerValidateBody,
  loginValidateBody,
} = require("./validation/auth-validaton");
const { auth, createToken, authenticate } = require("./auth");

module.exports = {
  registerValidateBody,
  loginValidateBody,
  auth,
  authenticate,
  createToken,
};
