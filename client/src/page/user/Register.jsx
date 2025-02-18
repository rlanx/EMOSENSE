import React, { useState } from "react";
import UserInp from "../../components/user/UserInp";
import { Link, useNavigate } from "react-router-dom";
import { LuUser, LuLock } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { registerUser, checkUsername } from "../../utils/func/authService";
import { Toaster, toast } from "react-hot-toast";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // ฟังก์ชันตรวจสอบรหัสผ่านให้มีความปลอดภัยระดับกลาง
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

  // ฟังก์ชันสุ่ม username และ password พร้อมกัน
  const generateCredentials = () => {
    const generateRandomPassword = () => {
      const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerCase = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const specialChars = "!@#$%^&*_";
      const allChars = upperCase + lowerCase + numbers + specialChars;

      let password = "";
      password += upperCase[Math.floor(Math.random() * upperCase.length)];
      password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password += specialChars[Math.floor(Math.random() * specialChars.length)];

      // เติมรหัสผ่านให้ครบ 10 ตัว
      for (let i = 4; i < 10; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
      }

      // สุ่มเรียงลำดับตัวอักษรใหม่ เพื่อให้ไม่อยู่ในลำดับเดิม
      return password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    };

    const randomUsername = `user${Math.floor(Math.random() * 100000)}`;
    const securePassword = generateRandomPassword();

    setUsername(randomUsername);
    setPassword(securePassword);
    setConfirmPassword(securePassword);
  };

  // ฟังก์ชันสมัครสมาชิก
  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "รหัสผ่านต้องความยาวอย่างน้อย 8 ตัว และประกอบด้วยตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ"
      );
      return;
    }

    // ตรวจสอบว่าชื่อซ้ำหรือไม่ก่อนสมัคร
    const check = await checkUsername(username);
    if (check.error) {
      toast.error(check.error);
      return;
    }

    toast
      .promise(registerUser(username, password), {
        loading: "กำลังสมัครสมาชิก...",
        success: "สมัครสมาชิกสำเร็จ!",
        error: (err) => `${err.message || "เกิดข้อผิดพลาด"}`,
      })
      .then(() => {
        setTimeout(() => navigate("/login"), 2000); // เปลี่ยนไปหน้า Login หลังจาก 2 วินาที
      });
  };

  return (
    <div className="h-screen w-full text-grey bg-gradient-to-b from-sea-blue to-green-pastel flex flex-col items-center justify-center gap-7">
      {/* alert */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white w-[485px] p-12 rounded-xl flex flex-col gap-7 shadow-lg">
        <div>
          <p className="text-[28px] font-semibold">
            สมัครบัญชี EMOSENSE ของคุณ
          </p>
        </div>
        <div className="space-y-4 flex flex-col items-center">
          {/* username */}
          <UserInp
            Icon={LuUser}
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* password */}
          <div className="w-full">
            <UserInp
              Icon={LuLock}
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="opacity-80 text-sm mt-2 px-1">
              รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว และต้องมีตัวพิมพ์ใหญ่,
              <br />
              ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ
            </p>
          </div>

          <UserInp
            Icon={LuLock}
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="w-full h-12 bg-primary text-white rounded-lg"
          >
            สมัครสมาชิก
          </button>
          {/* ปุ่มสุ่ม username และ password */}
          <button
            onClick={generateCredentials}
            className="relative group w-fit bg-light-blue text-sea-blue"
          >
            สร้างชื่อผู้ใช้และรหัสผ่านอัตโนมัติ
            <div
              className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-sea-blue
                      transition-transform origin-center scale-x-0 group-hover:scale-x-100"
            ></div>
          </button>
        </div>
        <div className="text-center">
          มับัญชีแล้ว ?
          <Link to={"/login"} className="ml-2 text-sea-blue">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
      <Link to={"/"} className="flex items-center gap-2">
        <FaArrowLeftLong size={18} />
        <p>กลับหน้าแรก</p>
      </Link>
    </div>
  );
}

export default Register;
