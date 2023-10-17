const express = require("express");

const { userUpdateValidateBody, auth, upload } = require("../middleware/index");

const {
  getCurrent,
  testController,
  updateUser,
} = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/current", auth, getCurrent);

userRouter.patch("/edit", auth, userUpdateValidateBody, updateUser);

// !  Example of using image uploading
userRouter.patch(
  "/test-path",
  auth,
  upload.single("avatar", 1),
  testController
);

module.exports = userRouter;
