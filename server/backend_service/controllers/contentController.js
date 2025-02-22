const News = require("../models/News");
const Research = require("../models/Research");
const fs = require("fs");
const path = require("path");

// เลือก Model ตาม type
const getModelByType = (type) => (type === "research" ? Research : News);

// เพิ่มข่าวสารหรืองานวิจัย
exports.addContent = async (req, res) => {
  try {
    const { title, desc, content, author, type } = req.body;
    const ContentModel = getModelByType(type);

    // ดึง path ของรูปแรกจาก content HTML
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(content);
    const thumbnail = match ? match[1] : "/src/assets/default-image.png";

    const newContent = new ContentModel({
      user_id: req.user.user_id,
      title,
      desc,
      content,
      thumbnail,
      author,
    });

    await newContent.save();
    res.status(201).json({ message: `${type} ถูกเพิ่มเรียบร้อยแล้ว!` });
  } catch (error) {
    console.error("Add Content Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
};

// อัปโหลดไฟล์จาก ReactQuill (ภาพในเนื้อหา)
exports.uploadImageFromEditor = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "ไม่พบไฟล์ที่อัปโหลด" });

    const imageUrl = `http://localhost:3000/uploads/content/${file.filename}`;
    res.status(200).json({ success: true, url: imageUrl });
  } catch (error) {
    console.error("Upload Image Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปโหลดภาพ" });
  }
};
