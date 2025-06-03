const express = require("express");
const router = express.Router();
const { register, login } = require("../Controllers/authController");
const controller = require('../Controllers/emailOtp');
const phoneOtp = require('../Controllers/phoneOtp');

router.post("/register", register);
router.post("/login", login);
router.post("/gmailOtp", controller.sendEmailOTP);
router.post("/phoneOtp", phoneOtp.sendOTP);



module.exports = router;
