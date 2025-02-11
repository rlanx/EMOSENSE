import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import UserInp from "../../components/user/UserInp";
import { LuUser, LuLock } from "react-icons/lu";
import { User, Pencil } from "lucide-react";
import RoleSelector from "../../components/admin/RoleSelector";

export default function AddUser() {
  const [selectedRole, setSelectedRole] = useState("user");

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[250px] flex flex-1 flex-col gap-5 p-6 items-center">
          {/* title */}
          <p className="w-fit px-5 text-center text-2xl font-semibold border-b-[3px] border-primary pb-1">
            เพิ่มผู้ใช้
          </p>

          <div className="w-[450px] space-y-4">
            {/* username */}
            <div className="space-y-1">
              <label>ชื่อผู้ใช้</label>
              <UserInp Icon={LuUser} type="text" placeholder="ชื่อผู้ใช้" />
            </div>

            {/* password */}
            <div className="space-y-1">
              <label>รหัสผ่าน</label>
              <UserInp Icon={LuLock} type="password" placeholder="รหัสผ่าน" />
            </div>

            {/* role */}
            <RoleSelector
              roles={["user", "admin"]}
              selectedRole={selectedRole}
              onChange={setSelectedRole}
            />

            <button className="w-full h-12 bg-primary text-white rounded-lg">
              เพิ่มผู้ใช้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
