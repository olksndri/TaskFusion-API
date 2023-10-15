const express = require("express");

const reviewsController = require("../controllers/reviewsController.js");
const { validateBody } = require("../decorators/index.js")
const { reviewsSchema } = require("../joi_schemas/index.js");
const { auth } = require("../middleware/auth.js");

const reviewsAddValidate = validateBody(reviewsSchema);

const reviewsRouter = express.Router();

reviewsRouter.use(auth);

reviewsRouter.get("/", reviewsController.getAll);

reviewsRouter.get("/:own", reviewsController.getById);

reviewsRouter.post("/", reviewsAddValidate, reviewsController.add);

reviewsRouter.patch("/:own", reviewsController.updateById);

reviewsRouter.delete("/:own", reviewsController.deleteById);

module.exports = reviewsRouter;