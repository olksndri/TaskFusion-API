const express = require("express");

const {
  registerValidateBody,
  //   auth,
  //   createToken,
} = require("../middleware/index");
const { registerUserCtrl } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/register", registerValidateBody, registerUserCtrl);

router.post("/login");

module.exports = router;
