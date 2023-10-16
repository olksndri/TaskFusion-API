const { registerValidateBody } = require("./validation/auth-validaton");
const { auth } = require("./auth");
const { upload } = require("./upload");

module.exports = {
  registerValidateBody,
  auth,
  upload,
};
