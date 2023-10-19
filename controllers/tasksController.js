const Task = require("../service/schemas/tasks");
const { HttpError } = require("../utilities/index.js");
const { ctrlWrapper } = require("../decorators/index.js");

const getAll = async (req, res, next) => {
  const { year, month } = req.query;
  const { id: owner } = req.user;
  const currentMonth = `${year}-${month.toString().padStart(2, "0")}`;

  const tasks = await Task.find({
    owner,
    date: { $regex: currentMonth, $options: "i" },
  });
  if (!tasks) {
    return next(HttpError(404, "Tasks not found"));
  }
  res.json(tasks);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const body = req.body;
  const { start, end } = req.body;

  if (!owner) {
    return next(HttpError(404, "Missing owner"));
  }

  if (!body) {
    return next(HttpError(404, "Missing body of request"));
  }

  if (start >= end) {
    return next(HttpError(400, "End time must be greater than Start time"));
  }

  const result = await Task.create({ ...body, owner });
  res.status(201).json({ message: "Task added successfully", result });
};

const updateById = async (req, res, next) => {
  const { taskId } = req.params;

  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
  });
  if (!updatedTask) {
    next(HttpError(404, `Task with id ${taskId} is not found`));
  }

  res.json(updatedTask);
};

const deleteById = async (req, res, next) => {
  const { taskId } = req.params;
  const { _id: owner } = req.user;

  const result = await Task.findByIdAndRemove({ _id: taskId, owner });
  if (!result) {
    next(HttpError(404, `Task with id ${taskId} not found`));
  }
  res.json({ message: "Task deleted successfully!" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
