const express = require("express");

const {
  registerValidateBody,
  loginValidateBody,
  auth,
} = require("../middleware/index");

const {
  registerUserCtrl,
  loginCtrl,
  signout,
} = require("../controllers/auth-controller");

const authRouter = express.Router();

authRouter.post("/register", registerValidateBody, registerUserCtrl);

authRouter.post("/login", loginValidateBody, loginCtrl);

authRouter.post("/logout", auth, signout);

module.exports = authRouter;
