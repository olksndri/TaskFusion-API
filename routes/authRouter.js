const express = require("express");

const {
  registerValidateBody,
  loginValidateBody,
  auth,
  passport,
} = require("../middleware/index");

const { authCtrl } = require("../controllers");

const authRouter = express.Router();

authRouter.get("/google",passport.authenticate("google", { scope: ["email", "profile"] }));

authRouter.get("/google/callback", passport.authenticate("google", { session: false }), authCtrl.googleAuth);

authRouter.post("/register", registerValidateBody, authCtrl.registerUserCtrl);

authRouter.post("/login", loginValidateBody, authCtrl.loginCtrl);

authRouter.post("/logout", auth, authCtrl.signout);

module.exports = authRouter;
