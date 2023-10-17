const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require("../../joi_schemas");
const { validateBody } = require("../../decorators/index");

const registerValidateBody = validateBody(registerSchema);
const loginValidateBody = validateBody(loginSchema);
const userUpdateValidateBody = validateBody(updateSchema);

module.exports = {
  registerValidateBody,
  loginValidateBody,
  userUpdateValidateBody,
};
