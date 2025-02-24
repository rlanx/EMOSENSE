const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");
const {
  addContent,
  getAllNews,
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

router.get("/news", verifyToken, getAllNews); // ดึงข้อมูลข่าวสารทั้งหมด
router.get("/:type/:id", getContentById); // ดึงข้อมูลตามประเภทและ ID
router.put(
  "/edit/:type/:id",
  verifyToken,
  uploadContent.single("thumbnail"),
  updateContent
); // เส้นทางสำหรับแก้ไขเนื้อหา

router.delete("/delete/:type/:id", verifyToken, deleteContent); // สำหรับลบเนื้อหาข่าวสาร/งานวิจัย

module.exports = router;
