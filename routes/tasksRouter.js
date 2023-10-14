const express = require("express");
const { tasksSchema } = require("../joi_schemas/index.js");
const { validateBody } = require("../decorators/index.js");
const tasksController = require("../controllers/tasks");

const tasksAddValidate = validateBody(tasksSchema);

const tasksRouter = express.Router();

tasksRouter.get("/", tasksController.getAll);
tasksRouter.post("/", tasksAddValidate, tasksController.add);
tasksRouter.patch("/:id", tasksAddValidate, tasksController.updateById);
tasksRouter.delete("/:id", tasksController.deleteById);

module.exports = tasksRouter;
