const express = require("express");
const tasksSchema = require("../joi_schemas/index.js");
const { validateBody } = require("../decorators/index.js");
const tasksController = require("../controllers/tasksController.js");
const { auth, isValidTaskId } = require("../middleware/index.js");
const tasksAddValidate = validateBody(tasksSchema);

const tasksRouter = express.Router();

tasksRouter.get("/", auth, tasksController.getAll);
tasksRouter.post("/", auth, tasksAddValidate, tasksController.add);
tasksRouter.patch(
  "/:id",
  auth,
  isValidTaskId,
  tasksAddValidate,
  tasksController.updateById
);
tasksRouter.delete("/:id", auth, isValidTaskId, tasksController.deleteById);

module.exports = tasksRouter;
