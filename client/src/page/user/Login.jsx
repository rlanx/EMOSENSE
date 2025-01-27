import React from "react";
import TextInp from "../../components/user/TextInp";
import { Link } from "react-router-dom";
import { LuUser, LuLock } from "react-icons/lu";

function Login() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-sea-blue to-green-pastel flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl flex flex-col gap-7">
        <div>
          <p className="text-[28px] font-semibold">
            เข้าสู่ระบบ EMOSENSE ของคุณ
          </p>
        </div>
        <div className="space-y-4">
          <TextInp Icon={LuUser} type="text" placeholder="ชื่อผู้ใช้" />
          <TextInp Icon={LuLock} type="password" placeholder="รหัสผ่าน" />
          <button className="w-full h-12 bg-primary text-white rounded-lg">
            เข้าสู่ระบบ
          </button>
        </div>
        <div className="text-center">
          ยังไม่เป็นสมาชิก
          <Link className="ml-2 text-sea-blue">คลิกเพื่อสมัครสมาชิก</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
