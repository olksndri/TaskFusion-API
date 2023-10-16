const express = require("express");

const {
  registerValidateBody,
  //   auth,
  //   createToken,
  upload,
} = require("../middleware/index");
const { registerUserCtrl } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/register", registerValidateBody, registerUserCtrl);

router.post("/login");

router.patch("/edit", upload.single("avatar", 1));

module.exports = router;
