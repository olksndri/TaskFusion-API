const {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
} = require("./validation/auth-validaton");
const { auth } = require("./auth");
const { upload } = require("./upload");

module.exports = {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
  auth,
  upload,
};
