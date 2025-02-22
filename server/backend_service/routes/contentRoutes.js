const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/verifyToken");
const {
  addContent,
  uploadImageFromEditor,
} = require("../controllers/contentController");

const { uploadContent } = require("../middlewares/upload");

// เพิ่มเนื้อหา (ข่าวสาร/งานวิจัย)
router.post(
  "/add/:type",
  verifyToken,
  uploadContent.array("images", 10),
  addContent
);

// อัปโหลดภาพจาก ReactQuill
router.post(
  "/upload-editor",
  uploadContent.single("image"),
  uploadImageFromEditor
);

module.exports = router;
