const { HttpError } = require("../utilities");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    return next();
  };
  return foo;
};

module.exports = {
  validateBody,
};
