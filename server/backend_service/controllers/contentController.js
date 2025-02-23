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
    if (!title || !content || !author) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    const thumbnailPath = req.file
      ? `/uploads/content/${req.file.filename}`
      : "/src/assets/default-image.png";

    const ContentModel = getModelByType(type);

    const newContent = new ContentModel({
      user_id: req.user.user_id,
      title,
      desc,
      content,
      thumbnail: thumbnailPath,
      author,
    });

    await newContent.save();
    res.status(201).json({ message: `${type} ถูกเพิ่มเรียบร้อยแล้ว!` });
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "ขนาดไฟล์เกิน 2MB" });
    }
    console.error("Add Content Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
};

// ฟังก์ชันดึงรายการข่าวสารทั้งหมด
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find({}).select(
      "news_id title author createdAt thumbnail"
    );

    if (newsList.length === 0) {
      return res.status(404).json({ message: "ยังไม่มีข่าวสารในระบบ" });
    }

    res.status(200).json(newsList);
  } catch (error) {
    console.error("Get All News Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลข่าวสาร" });
  }
};

// ดึงข้อมูลข่าวสารหรือผลงานวิจัยตามประเภทและ ID
exports.getContentById = async (req, res) => {
  try {
    const { type, id } = req.params;

    let content;
    if (type === "news") {
      content = await News.findOne({ news_id: id });
    } else if (type === "research") {
      content = await Research.findOne({ research_id: id });
    } else {
      return res.status(400).json({ message: "ประเภทข้อมูลไม่ถูกต้อง" });
    }

    if (!content) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการ" });
    }

    // ส่ง URL เต็มของ thumbnail กลับไป
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const thumbnailUrl = `${baseUrl}${content.thumbnail}`;

    res.status(200).json({
      ...content._doc,
      thumbnail: thumbnailUrl,
    });
  } catch (error) {
    console.error("Get Content by ID Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
};
