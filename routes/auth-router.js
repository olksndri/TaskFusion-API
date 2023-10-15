const express = require("express");

const {
  registerValidateBody,
  loginValidateBody,
  //   auth,
  //   createToken,
} = require("../middleware/index");

const { registerUserCtrl } = require("../controllers/auth-controller");

const authRouter = express.Router();


authRouter.post("/register", registerValidateBody, registerUserCtrl);

authRouter.post("/login", loginValidateBody, );

module.exports = authRouter;
