const { httpError } = require("../utilities/index");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    const { error } = schema.validate(req.body);
    return error ? next(httpError(400, error.message)) : next();
  };
  return foo;
};

module.exports = {
  validateBody,
};
