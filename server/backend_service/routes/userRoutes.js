const express = require("express");
const {
  getUserProfile,
  updateUser,
  getAllUsers,
  addUser,
  updateUserByAdmin,
  getUserById,
  deleteUserByAdmin,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");

const router = express.Router();

// ใช้ `verifyToken` เพื่อป้องกัน API
router.get("/me", verifyToken, getUserProfile);
router.put("/update", verifyToken, upload.single("profileImage"), updateUser);

// admin เท่านั้น
router.get("/users", verifyToken, getAllUsers);
router.post("/add-user", verifyToken, addUser);
router.put("/edit-user/:id", verifyToken, updateUserByAdmin);
router.get("/get-user/:id", verifyToken, getUserById);
router.delete("/delete-user/:id", verifyToken, deleteUserByAdmin);

module.exports = router;
