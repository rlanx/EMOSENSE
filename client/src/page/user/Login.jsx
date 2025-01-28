import React from "react";
import TextInp from "../../components/user/TextInp";
import { Link } from "react-router-dom";
import { LuUser, LuLock } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";

function Login() {
  return (
    <div className="h-screen w-full text-grey bg-gradient-to-b from-sea-blue to-green-pastel flex flex-col items-center justify-center gap-7">
      <div className="bg-white w-[485px] p-12 rounded-xl flex flex-col gap-7 shadow-lg">
        <div>
          <p className="text-[28px] font-semibold">
            เข้าสู่บัญชี EMOSENSE ของคุณ
          </p>
        </div>
        <div className="space-y-4">
          {/* username */}
          <TextInp Icon={LuUser} type="text" placeholder="ชื่อผู้ใช้" />
          {/* password */}
          <TextInp Icon={LuLock} type="password" placeholder="รหัสผ่าน" />
          <button className="w-full h-12 bg-primary text-white rounded-lg">
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
