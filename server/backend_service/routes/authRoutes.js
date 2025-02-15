const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// สมัครสมาชิก
router.post("/register", registerUser);

// เข้าสู่ระบบ
router.post("/login", loginUser);

module.exports = router;
