const multer = require("multer");
const path = require("path");

// ✅ ตั้งค่าการอัปโหลดรูปภาพ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users_image/"); // บันทึกไฟล์ในโฟลเดอร์ uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // ตั้งชื่อไฟล์ให้ไม่ซ้ำกัน
  },
});

// ✅ ตรวจสอบประเภทไฟล์ (เฉพาะ .jpg, .jpeg, .png เท่านั้น)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("ไฟล์ต้องเป็น .jpg, .jpeg หรือ .png เท่านั้น"), false);
  }
};

// ✅ กำหนด Middleware สำหรับอัปโหลดไฟล์
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // จำกัดขนาดไฟล์ไม่เกิน 5MB
});

module.exports = upload;
