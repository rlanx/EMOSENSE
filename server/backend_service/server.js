const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// นำเข้า Routes หลังจากสร้าง `app`
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
const contentRoutes = require("./routes/contentRoutes");
app.use("/api/content", contentRoutes);

// เชื่อมต่อ MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing in .env file!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
