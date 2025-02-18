import React, { useState } from "react";
import UserInp from "../../components/user/UserInp";
import { Link, useNavigate } from "react-router-dom";
import { LuUser, LuLock } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { loginUser } from "../../utils/func/authService";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ฟังก์ชันเข้าสู่ระบบ
  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    const response = await loginUser(username, password); // รอ API ตอบกลับ

    if (response.error) {
      toast.error(response.error); // แสดง Error ถ้า Login ไม่สำเร็จ
      return;
    }

    toast.success("เข้าสู่ระบบสำเร็จ!");
    setTimeout(() => navigate("/"), 2000); // เปลี่ยนหน้าเมื่อสำเร็จ
  };
  return (
    <div className="h-screen w-full text-grey bg-gradient-to-b from-sea-blue to-green-pastel flex flex-col items-center justify-center gap-7">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white w-[485px] p-12 rounded-xl flex flex-col gap-7 shadow-lg">
        <div>
          <p className="text-[28px] font-semibold">
            เข้าสู่บัญชี EMOSENSE ของคุณ
          </p>
        </div>
        <div className="space-y-4">
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
          <button
            onClick={handleLogin}
            className="w-full h-12 bg-primary text-white rounded-lg"
          >
            เข้าสู่ระบบ
          </button>
        </div>
        <div className="text-center">
          ยังไม่เป็นสมาชิก
          <Link to={"/register"} className="ml-2 text-sea-blue">
            คลิกเพื่อสมัครสมาชิก
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

export default Login;
