const {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
} = require("./validation/auth-validaton");
const { auth } = require("./auth");
const { upload } = require("./upload");
const isValidTaskId = require("./isValidTaskId");

module.exports = {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
  auth,
  upload,
  isValidTaskId,
};
