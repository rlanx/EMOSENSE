const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true }, // ใช้เป็น ID หลัก
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: "" },
  role: { type: String, enum: ["admin", "user"], default: "user" }, // ควบคุมสิทธิ์
  createdAt: { type: Date, default: Date.now }, // บันทึกวันที่สมัคร
});

// กำหนดให้ user_id เพิ่มขึ้นอัตโนมัติ
UserSchema.pre("save", async function (next) {
  if (!this.user_id) {
    const lastUser = await this.constructor.findOne().sort("-user_id");
    this.user_id = lastUser ? lastUser.user_id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
