const express = require("express");

const { reviewsCtrl } = require("../controllers");
const { auth } = require("../middleware/auth.js");
const { reviewsValidate } = require("../middleware");

const reviewsRouter = express.Router();

reviewsRouter.get("/", reviewsCtrl.getAll);

reviewsRouter.use(auth);

reviewsRouter.get("/own", reviewsCtrl.getById);

reviewsRouter.post("/own", reviewsValidate, reviewsCtrl.add);

reviewsRouter.patch("/own", reviewsValidate, reviewsCtrl.updateById);

reviewsRouter.delete("/own", reviewsCtrl.deleteById);

module.exports = reviewsRouter;
