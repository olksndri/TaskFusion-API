const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../../utilities/index.js");

const isValidTaskId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not valid Task id`));
  }
  next();
};

module.exports = isValidTaskId;
