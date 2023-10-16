const { registerValidateBody,loginValidateBody} = require("./validation/auth-validaton");
const { auth } = require("./auth");
const { upload } = require("./upload");

module.exports = {
  registerValidateBody,
  loginValidateBody,
  auth,
  upload,
};
