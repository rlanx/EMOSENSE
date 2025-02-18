const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

module.exports.registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "ชื่อผู้ใช้ถูกใช้ไปแล้ว" });
    }

    // เข้ารหัสรหัสผ่าน
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // สร้าง User ใหม่ (กำหนด role หากไม่มีให้ default เป็น "user")
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการสมัครสมาชิก" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบว่ามี username หรือไม่
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "ไม่พบผู้ใช้" });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

    // สร้าง JWT Token พร้อมกับ role และ user_id
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ส่ง Token ผ่าน Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // เปลี่ยนเป็น `true` ถ้าใช้ HTTPS
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // หมดอายุใน 1 ชั่วโมง
    });

    res.json({ message: "เข้าสู่ระบบสำเร็จ", token, role: user.role });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
};

// ดึงข้อมูล User จาก Cookie
module.exports.getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ user_id: decoded.user_id });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }

    res.json({
      username: user.username,
      role: user.role,
      profileImage: user.profileImage, // ✅ ส่ง `profileImage` กลับไป
    });
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// ออกจากระบบ
module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "ออกจากระบบสำเร็จ" });
};

// ฟังก์ชันตรวจสอบรหัสผ่านให้อยู่ในระดับกลาง
const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*_]/.test(password);

  return (
    minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  );
};

// API อัปเดตรหัสผ่าน, ชื่อผู้ใช้ และรูปโปรไฟล์
module.exports.updateUser = async (req, res) => {
  try {
    const { newUsername, newPassword, confirmPassword } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ตรวจสอบ JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ user_id: decoded.user_id });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }

    // อัปเดตชื่อผู้ใช้ (ตรวจสอบว่าชื่อซ้ำหรือไม่)
    if (newUsername && newUsername !== user.username) {
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser) {
        return res.status(400).json({ message: "ชื่อผู้ใช้ถูกใช้ไปแล้ว" });
      }
      user.username = newUsername;
    }

    // อัปเดตรหัสผ่าน (ถ้าผู้ใช้ต้องการเปลี่ยน)
    if (newPassword && confirmPassword) {
      if (!validatePassword(newPassword)) {
        return res.status(400).json({
          message:
            "รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป และต้องมีตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ",
        });
      }
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // อัปเดตรูปโปรไฟล์ (ถ้ามีการอัปโหลด)
    if (req.file) {
      user.profileImage = `/uploads/users_image/${req.file.filename}`;
    }

    await user.save();

    res.json({
      message: "อัปเดตข้อมูลสำเร็จ!",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้" });
  }
};

// ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่ (ใช้สำหรับเช็คก่อนสมัคร)
module.exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
    }

    res.json({ message: "สามารถใช้ชื่อนี้ได้" });
  } catch (error) {
    console.error("Check Username Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการตรวจสอบชื่อผู้ใช้" });
  }
};
