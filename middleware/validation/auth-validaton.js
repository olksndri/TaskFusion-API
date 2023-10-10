const { registerSchema } = require("../../joi_schemas/index");
const { validateBody } = require("../../decorators/index");

const registerValidateBody = validateBody(registerSchema);

module.exports = { registerValidateBody };
