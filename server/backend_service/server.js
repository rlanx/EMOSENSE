const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// สร้าง Express app ก่อนใช้ Middleware
const app = express();

// ใช้ Middleware ตามลำดับที่ถูกต้อง
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// ในำเข้า Routes หลังจากสร้าง `app`
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// เชื่อมต่อ MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing in .env file!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// เริ่มต้น Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
