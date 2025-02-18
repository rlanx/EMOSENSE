const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  checkUsername,
} = require("../controllers/authController");

const router = express.Router();
const jwt = require("jsonwebtoken");

// สมัครสมาชิก
router.post("/register", registerUser);

// เข้าสู่ระบบ
router.post("/login", loginUser);

// ออกจากระบบ
router.post("/logout", logoutUser);

router.post("/check-username", checkUsername);

module.exports = router;
