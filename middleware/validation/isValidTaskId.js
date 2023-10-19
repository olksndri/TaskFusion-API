const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../../utilities/index.js");

const isValidTaskId = (req, res, next) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    return next(HttpError(404, `${taskId} is not valid Task id`));
  }
  next();
};

module.exports = isValidTaskId;
