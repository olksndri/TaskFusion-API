const { HttpError } = require("../utilities/index");

const ctrlWrapper = (ctrl) => {
  const foo = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (e) {
      next(HttpError(500, e.message));
    }
  };
  return foo;
};

module.exports = { ctrlWrapper };
