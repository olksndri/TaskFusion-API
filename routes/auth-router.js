const express = require("express");

const {
  registerValidateBody,
  loginValidateBody,
  auth,
  upload,
} = require("../middleware/index");

const {
  registerUserCtrl,
  loginCtrl,
  getCurrent,
  signout,
  testController,
} = require("../controllers/auth-controller");

const authRouter = express.Router();

authRouter.post("/register", registerValidateBody, registerUserCtrl);

authRouter.post("/login", loginValidateBody, loginCtrl);

authRouter.get("/current", auth, getCurrent);

authRouter.post("/logout", auth, signout);

// !  Example of using image uploading
authRouter.patch(
  "/test-path",
  auth,
  upload.single("avatar", 1),
  testController
);

module.exports = authRouter;
