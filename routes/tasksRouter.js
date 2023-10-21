const express = require("express");
const { taskAddSchema, taskUpdateSchema } = require("../joi_schemas/index.js");
const { validateBody } = require("../decorators/index.js");
const tasksController = require("../controllers/tasksController.js");
const { auth, isValidTaskId } = require("../middleware/index.js");

const tasksAddValidate = validateBody(taskAddSchema);
const taskUpdateValidate = validateBody(taskUpdateSchema);

const tasksRouter = express.Router();

tasksRouter.use(auth);

tasksRouter.get("/", tasksController.getAll); 
tasksRouter.post("/", tasksAddValidate, tasksController.add);
tasksRouter.patch(
  "/:id",
  isValidTaskId,
  taskUpdateValidate,
  tasksController.updateById
);
tasksRouter.delete("/:id", isValidTaskId, tasksController.deleteById);

module.exports = tasksRouter;
