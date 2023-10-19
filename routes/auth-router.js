const express = require("express");

const {
  registerValidateBody,
  loginValidateBody,
  auth,
  passport,
} = require("../middleware/index");

const {
  registerUserCtrl,
  googleAuth,
  loginCtrl,
  signout,
} = require("../controllers/auth-controller");

const authRouter = express.Router();

authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))

authRouter.get("/google/callback", passport.authenticate("google", {session:false }), googleAuth)

authRouter.post("/register", registerValidateBody, registerUserCtrl);

authRouter.post("/login", loginValidateBody, loginCtrl);

authRouter.post("/logout", auth, signout);

module.exports = authRouter;
