const {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
} = require("./validation/authValidaton");
const { auth } = require("./auth");
const { upload } = require("./upload");
const passport = require("./google-authentificate")
const isValidTaskId = require("./validation/isValidTaskId");
const { reviewsValidate } = require("./validation/reviewsValidation");


module.exports = {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
  auth,
  upload,
  passport,
  isValidTaskId,
  reviewsValidate,
};
