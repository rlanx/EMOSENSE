const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/authController");
const router = express.Router();
const jwt = require("jsonwebtoken");

// สมัครสมาชิก
router.post("/register", registerUser);

// เข้าสู่ระบบ
router.post("/login", loginUser);

// ดึงข้อมูล User
router.get("/me", getUserProfile);

// ออกจากระบบ
router.post("/logout", logoutUser);

module.exports = router;
