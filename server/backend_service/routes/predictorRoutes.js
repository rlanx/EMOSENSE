const express = require("express");
const router = express.Router();
const { analyzeText } = require("../controllers/predictorController");
const verifyToken = require("../middlewares/verifyToken"); // ใช้ตรวจสอบ token

router.post(
  "/predict",
  (req, res, next) => {
    verifyToken(req, res, () => next()); // ถ้ามี token ให้ตรวจสอบ, ถ้าไม่มีให้ข้ามไปเลย
  },
  analyzeText
);

module.exports = router;
