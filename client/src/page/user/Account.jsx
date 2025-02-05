import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import UserInp from "../../components/user/UserInp";
import { LuUser, LuLock } from "react-icons/lu";
import { User, Pencil } from "lucide-react";
import Footer from "../../components/user/Footer";

export default function Account() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

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

  // เมื่อกดบันทึก
  const handleSave = () => {
    if (!validatePassword(newPassword)) {
      setError(
        "รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป และต้องมี\nตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ"
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setError("");
    alert("บันทึกข้อมูลสำเร็จ!");
  };

  return (
    <div>
      <Navbar />
      {/* main container */}
      <div className="lg:w-[1280px] mx-auto flex flex-col gap-5 justify-center items-center mt-5 mb-10">
        {/* title */}
        <p className="w-[150px] text-center text-2xl font-semibold border-b-[3px] border-primary pb-2">
          ตั้งค่าบัญชี
        </p>
        {/* image & edit profile form */}
        <div className="lg:max-w-[620px] flex gap-10 p-10 border-[1px] shadow-md rounded-3xl">
          {/* info container */}
          <div className="flex flex-col items-center gap-5">
            <p className="text-xl text-center font-semibold">user12345</p>
            <div className="bg-[#f5f5f5] rounded-full overflow-hidden size-[200px] flex items-center justify-center">
              <User size={50} strokeWidth={1} />
            </div>
            <button className="relative group w-fit bg-light-blue text-sea-blue">
              อัปโหลดรูปภาพ
              <div
                className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-sea-blue
                        transition-transform origin-center scale-x-0 group-hover:scale-x-100"
              ></div>
            </button>
          </div>

          {/* input container */}
          <div className="flex flex-col gap-3 items-end text-grey">
            {/* username */}
            <div className="w-full space-y-1">
              <label>ชื่อผู้ใช้</label>
              <UserInp Icon={LuUser} type="text" placeholder="ชื่อผู้ใช้" />
            </div>

            {/* password */}
            <div className="w-full space-y-1">
              <label>รหัสผ่าน</label>
              <UserInp Icon={LuLock} type="password" placeholder="รหัสผ่าน" />
            </div>

            {/* new password */}
            <div className="w-full space-y-1">
              <label>รหัสผ่านใหม่</label>
              <UserInp
                Icon={LuLock}
                type="password"
                placeholder="รหัสผ่านใหม่"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {error ? (
                <p className="text-error text-sm whitespace-pre-line">
                  {error}
                </p>
              ) : (
                <p className="opacity-80 text-sm">
                  รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป และต้องมี
                  <br />
                  ตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ
                </p>
              )}
            </div>

            {/* confirm new password */}
            <div className="w-full space-y-1">
              <label>ยืนยันรหัสผ่านใหม่</label>
              <UserInp
                Icon={LuLock}
                type="password"
                placeholder="ยืนยันรหัสผ่านใหม่"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className={`flex items-center gap-2 h-11 px-5 bg-primary rounded-lg text-white ${
                validatePassword(newPassword) && newPassword === confirmPassword
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              } `}
              onClick={handleSave}
              disabled={
                !validatePassword(newPassword) ||
                newPassword !== confirmPassword
              }
            >
              <Pencil size={18} />
              บันทึก
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
