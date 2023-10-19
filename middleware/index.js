const {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
} = require("./validation/auth-validaton");
const { auth } = require("./auth");
const { upload } = require("./upload");
const passport = require("./google-authentificate")

module.exports = {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
  auth,
  upload,
  passport,
};
