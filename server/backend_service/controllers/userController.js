const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ดึงข้อมูล User จาก Cookie
module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.user.user_id }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }

    res.json({
      username: user.username,
      role: user.role,
      profileImage: user.profileImage || null, // ส่ง `profileImage` กลับไป
      maskedPassword: "********",
    });
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
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
    const { oldPassword, newUsername, newPassword, confirmPassword } = req.body;
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
    if (newPassword || confirmPassword) {
      if (!oldPassword) {
        return res.status(400).json({ message: "กรุณากรอกรหัสผ่านเดิม" });
      }

      // ตรวจสอบรหัสผ่านเดิม
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "รหัสผ่านเดิมไม่ถูกต้อง" });
      }

      // ตรวจสอบรหัสผ่านใหม่
      if (!validatePassword(newPassword)) {
        return res.status(400).json({
          message:
            "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว และต้องมีตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ",
        });
      }
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "รหัสผ่านใหม่และยืนยันไม่ตรงกัน" });
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

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // ดึงข้อมูลทั้งหมด ยกเว้นรหัสผ่าน
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้" });
  }
};

// ฟังก์ชันเพิ่มผู้ใช้ใหม่ (เฉพาะ Admin)
module.exports.addUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // ตรวจสอบสิทธิ์ Admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "คุณไม่มีสิทธิ์เพิ่มผู้ใช้" });
    }

    // ตรวจสอบชื่อผู้ใช้ซ้ำ
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "ชื่อผู้ใช้ถูกใช้ไปแล้ว" });
    }

    // เข้ารหัสรหัสผ่าน
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // เพิ่มผู้ใช้ใหม่
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || "user", // กำหนดค่าเริ่มต้นเป็น user
    });

    await newUser.save();

    res.status(201).json({ message: "เพิ่มผู้ใช้สำเร็จ!" });
  } catch (error) {
    console.error("Add User Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้" });
  }
};

// ฟังก์ชันสำหรับแก้ไขข้อมูลผู้ใช้ (เฉพาะ Admin)
module.exports.updateUserByAdmin = async (req, res) => {
  try {
    const { username, newPassword, role } = req.body;
    const userId = req.params.id;

    // ตรวจสอบสิทธิ์ Admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "คุณไม่มีสิทธิ์แก้ไขผู้ใช้" });
    }

    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }

    // ตรวจสอบชื่อผู้ใช้ซ้ำ
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "ชื่อผู้ใช้ถูกใช้ไปแล้ว" });
      }
      user.username = username;
    }

    // อัปเดตรหัสผ่าน (ถ้ามี)
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // อัปเดตบทบาท
    if (role) user.role = role;

    await user.save();

    res.json({ message: "อัปเดตข้อมูลผู้ใช้สำเร็จ!" });
  } catch (error) {
    console.error("Update User by Admin Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้" });
  }
};

// ดึงข้อมูลผู้ใช้ตาม ID
module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "ไม่พบข้อมูลผู้ใช้" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get User By ID Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้" });
  }
};

// ฟังก์ชันสำหรับลบผู้ใช้ (เฉพาะ Admin)
module.exports.deleteUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    // ตรวจสอบสิทธิ์ Admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "คุณไม่มีสิทธิ์ลบผู้ใช้" });
    }

    const user = await User.findOneAndDelete({ user_id: userId });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้ที่ต้องการลบ" });
    }

    res.json({ message: "ลบผู้ใช้สำเร็จ!" });
  } catch (error) {
    console.error("Delete User by Admin Error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบผู้ใช้" });
  }
};
