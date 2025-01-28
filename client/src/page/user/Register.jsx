import React, { useState } from "react";
import UserInp from "../../components/user/UserInp";
import { Link } from "react-router-dom";
import { LuUser, LuLock } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ฟังก์ชันสุ่ม username และ password พร้อมกัน
  const generateCredentials = () => {
    const randomUsername = `user${Math.floor(Math.random() * 100000)}`;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const randomPassword = Array.from({ length: 10 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");

    setUsername(randomUsername);
    setPassword(randomPassword);
  };

  return (
    <div className="h-screen w-full text-grey bg-gradient-to-b from-sea-blue to-green-pastel flex flex-col items-center justify-center gap-7">
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
          <UserInp
            Icon={LuLock}
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <UserInp Icon={LuLock} type="password" placeholder="ยืนยันรหัสผ่าน" />
          <button className="w-full h-12 bg-primary text-white rounded-lg">
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
