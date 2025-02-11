import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import UserInp from "../../components/user/UserInp";
import { LuUser, LuLock } from "react-icons/lu";
import { User, Pencil } from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";
import RoleSelector from "../../components/admin/RoleSelector";

export default function EditUser() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");

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
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[250px] flex flex-1 flex-col gap-5 p-6 items-center">
          {/* title */}
          <p className="w-fit px-5 text-center text-2xl font-semibold border-b-[3px] border-primary pb-1">
            แก้ไขข้อมูลผู้ใช้ user1234
          </p>

          <div className="w-[450px]">
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

              {/* role */}
              <div className="w-full">
                <RoleSelector
                  roles={["user", "admin"]}
                  selectedRole={selectedRole}
                  onChange={setSelectedRole}
                />
              </div>

              <button
                className={`flex items-center gap-2 h-11 px-5 rounded-lg text-white ${
                  validatePassword(newPassword) &&
                  newPassword === confirmPassword
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
      </div>
    </div>
  );
}
