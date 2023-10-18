const express = require("express");

const { userUpdateValidateBody, auth, upload } = require("../middleware/index");

const { getCurrent, updateUser } = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/current", auth, getCurrent);

userRouter.patch(
  "/edit",
  auth,
  userUpdateValidateBody,
  upload.single("avatar", 1),
  updateUser
);

module.exports = userRouter;
