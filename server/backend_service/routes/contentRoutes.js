const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");
const {
  addContent,
  getAllNews,
  getAllResearch,
  getContentById,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

const { uploadContent } = require("../middlewares/upload");

// เพิ่มเนื้อหา (ข่าวสาร/งานวิจัย)
router.post(
  "/add/:type",
  verifyToken,
  uploadContent.single("thumbnail"),
  addContent
);

// ดึงข้อมูลข่าวสารทั้งหมด
router.get("/news", verifyToken, getAllNews);

// ดึงข้อมูลงานวิจัยทั้งหมด
router.get("/research", verifyToken, getAllResearch);

// ดึงข้อมูลตามประเภทและ ID
router.get("/:type/:id", getContentById);

// เส้นทางสำหรับแก้ไขเนื้อหา
router.put(
  "/edit/:type/:id",
  verifyToken,
  uploadContent.single("thumbnail"),
  updateContent
);

// สำหรับลบเนื้อหาข่าวสาร/งานวิจัย
router.delete("/delete/:type/:id", verifyToken, deleteContent);

module.exports = router;
