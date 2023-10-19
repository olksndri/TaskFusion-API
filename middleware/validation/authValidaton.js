const { registerSchema, loginSchema } = require("../../joi_schemas");
const { validateBody } = require("../../decorators/index");

const registerValidateBody = validateBody(registerSchema);
const loginValidateBody = validateBody(loginSchema);

module.exports = {
  registerValidateBody,
  loginValidateBody,
};
