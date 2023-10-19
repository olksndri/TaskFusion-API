const express = require("express");

const {
  registerValidateBody,
  loginValidateBody,
  auth,
} = require("../middleware/index");

const { authCtrl } = require("../controllers");

const authRouter = express.Router();

authRouter.post("/register", registerValidateBody, authCtrl.registerUserCtrl);

authRouter.post("/login", loginValidateBody, authCtrl.loginCtrl);

authRouter.post("/logout", auth, authCtrl.signout);

module.exports = authRouter;
