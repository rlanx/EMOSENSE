const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ฟังก์ชันสำหรับกำหนดโฟลเดอร์ตามประเภท
const getStorage = (folderName) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `uploads/${folderName}/`;
      if (!fs.existsSync(uploadPath))
        fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// ตรวจสอบประเภทไฟล์
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("ไฟล์ต้องเป็น .jpg, .jpeg หรือ .png เท่านั้น"), false);
};

// สำหรับอัปโหลด **รูปโปรไฟล์ผู้ใช้**
const uploadProfile = multer({
  storage: getStorage("users_image"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// สำหรับอัปโหลดรูปภาพเนื้อหา
const uploadContent = multer({
  storage: getStorage("content"),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // ✅ จำกัดขนาด 2MB
});

module.exports = { uploadProfile, uploadContent };
