const { registerValidateBody } = require("./validation/auth-validaton");
const { auth, createToken } = require("./auth");

module.exports = {
  registerValidateBody,
  auth,
  createToken,
};
