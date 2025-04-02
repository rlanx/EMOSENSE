const express = require("express");
const {
  getUserProfile,
  updateUser,
  getAllUsers,
  addUser,
  updateUserByAdmin,
  getUserById,
  deleteUserByAdmin,
  getUserAnalysisHistory,
  getUserHistoryByAdmin,
  getDashboardStats,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const { uploadProfile } = require("../middlewares/upload");

const router = express.Router();

// ใช้ `verifyToken` เพื่อป้องกัน API
router.get("/me", verifyToken, getUserProfile);
router.put(
  "/update",
  verifyToken,
  uploadProfile.single("profileImage"),
  updateUser
);

// admin เท่านั้น
router.get("/dashboard-stats", verifyToken, getDashboardStats);
router.get("/users", verifyToken, getAllUsers);
router.post("/add-user", verifyToken, addUser);
router.put("/edit-user/:id", verifyToken, updateUserByAdmin);
router.get("/get-user/:id", verifyToken, getUserById);
router.delete("/delete-user/:id", verifyToken, deleteUserByAdmin);

// ดึงประวัติการวิเคราะห์ของผู้ใช้ที่เข้าสู่ระบบ
router.get("/history", verifyToken, getUserAnalysisHistory);

// ดึงประวัติการวิเคราะห์ของผู้ใช้ที่ระบุ (admin เท่านั้น)
router.get("/history/:id", verifyToken, getUserHistoryByAdmin);

module.exports = router;
