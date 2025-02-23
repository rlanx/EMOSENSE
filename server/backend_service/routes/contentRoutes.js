const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");
const {
  addContent,
  getAllNews,
  getContentById,
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

module.exports = router;
