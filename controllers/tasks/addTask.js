const Task = require("../../service/schemas/tasks");
const User = require("../../service/schemas/users");
const { httpError } = require("../../utilities");

const addTask = async (req, res) => {
  const { _id: owner } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw httpError(404, "User not found");
  }
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};
