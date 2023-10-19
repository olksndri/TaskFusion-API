const express = require("express");

const { auth, upload } = require("../middleware");
const { usersCtrl } = require("../controllers");

const userRouter = express.Router();

userRouter.get("/current", auth, usersCtrl.getCurrent);

userRouter.patch(
  "/edit",
  auth,
  upload.single("avatar", 1),
  usersCtrl.updateUser
);

module.exports = userRouter;
