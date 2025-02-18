const express = require("express");
const {
  addUser,
  getAllUsers,
  getUserProfile,
  updateUser,
} = require("../controllers/userController");

const upload = require("../middlewares/upload"); // นำเข้า Middleware

const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

// ดึงข้อมูล User
router.get("/me", verifyToken, getUserProfile);

// เส้นทางสำหรับเพิ่มผู้ใช้ (Admin เท่านั้น)
router.post("/add-user", verifyToken, addUser);

// เส้นทางสำหรับดึงรายชื่อผู้ใช้ทั้งหมด (Admin เท่านั้น)
router.get("/users", verifyToken, getAllUsers);

// อัปเดตข้อมูลผู้ใช้ (ชื่อ, รหัสผ่าน, รูปโปรไฟล์)
router.put("/update", upload.single("profileImage"), verifyToken, updateUser);

module.exports = router;
