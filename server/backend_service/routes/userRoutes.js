const express = require("express");
const {
  getUserProfile,
  updateUser,
  getAllUsers,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");

const router = express.Router();

// ใช้ `verifyToken` เพื่อป้องกัน API
router.get("/me", verifyToken, getUserProfile);
router.put("/update", verifyToken, upload.single("profileImage"), updateUser);
router.get("/users", verifyToken, getAllUsers); // Admin เท่านั้น

module.exports = router;
