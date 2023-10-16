const express = require("express");

const {
  registerValidateBody,
  loginValidateBody,
  authenticate,
  //   createToken,
} = require("../middleware/index");

const {
  registerUserCtrl,
  loginCtrl,
  getCurrent,
  signout,
} = require("../controllers/auth-controller");

const authRouter = express.Router();

authRouter.post("/register", registerValidateBody, registerUserCtrl);

authRouter.post("/login", loginValidateBody, loginCtrl);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, signout);

module.exports = authRouter;
