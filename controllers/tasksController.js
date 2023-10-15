const Task = require("../service/schemas/tasks");
const User = require("../service/schemas/users");
const { httpError } = require("../utilities/index.js");
const { ctrlWrapper } = require("../decorators/index.js");

const getAll = async (req, res) => {
  const { id: owner } = req.user;

  const currentDate = new Date();

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    const tasks = await Task.find({
      owner,
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  try {
    const user = await User.findById(owner);
    if (!user) {
      throw new httpError(404, "User not found");
    }
    const result = await Task.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (!updatedTask) {
      throw new httpError(404, "Task not found");
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const result = await Task.findOneAndDelete({ _id: id, owner });
    if (!result) {
      throw httpError(404, `Task with id ${id} does not exist`);
    }
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
