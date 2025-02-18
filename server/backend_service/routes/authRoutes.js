const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUser,
  checkUsername,
} = require("../controllers/authController");

const upload = require("../middlewares/upload"); // นำเข้า Middleware

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

// อัปเดตข้อมูลผู้ใช้ (ชื่อ, รหัสผ่าน, รูปโปรไฟล์)
router.put("/update", upload.single("profileImage"), updateUser);

router.post("/check-username", checkUsername);

module.exports = router;
