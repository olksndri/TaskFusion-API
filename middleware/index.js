const { registerValidateBody } = require("./validation/auth-validaton");
const { auth } = require("./auth");

module.exports = {
  registerValidateBody,
  auth,
};
