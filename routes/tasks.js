const express = require("express");
const { taskSchema } = require("../service/schemas/tasks");
const { validateBody } = require("../decorators/index.js");
const tasksController = require("../controllers/tasks");

const tasksRouter = express.Router();

tasksRouter.post("/", validateBody(taskSchema));
