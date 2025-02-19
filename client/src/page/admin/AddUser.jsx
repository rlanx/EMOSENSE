import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import UserInp from "../../components/user/UserInp";
import { LuUser, LuLock } from "react-icons/lu";
import { User, Pencil } from "lucide-react";
import RoleSelector from "../../components/admin/RoleSelector";
import { addUser } from "../../utils/func/adminService";
import { Toaster, toast } from "react-hot-toast";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");

  // ฟังก์ชันเรียก API เพื่อเพิ่มผู้ใช้
  const handleAddUser = async () => {
    if (!username || !password) {
      toast.error("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    const response = await addUser(username, password, selectedRole);
    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("เพิ่มผู้ใช้สำเร็จ!");
    setUsername("");
    setPassword("");
    setSelectedRole("user");
  };

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[250px] flex flex-1 flex-col gap-5 p-6 items-center">
          {/* title */}
          <p className="w-fit px-3 text-center text-2xl font-semibold border-b-[3px] border-primary pb-1">
            เพิ่มผู้ใช้
          </p>

          <div className="w-[450px] space-y-4">
            {/* username */}
            <div className="space-y-1">
              <label>ชื่อผู้ใช้</label>
              <UserInp
                Icon={LuUser}
                type="text"
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* password */}
            <div className="space-y-1">
              <label>รหัสผ่าน</label>
              <UserInp
                Icon={LuLock}
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* role */}
            <RoleSelector
              roles={["user", "admin"]}
              selectedRole={selectedRole}
              onChange={setSelectedRole}
            />

            <button
              onClick={handleAddUser}
              className="w-full h-12 bg-primary text-white rounded-lg"
            >
              เพิ่มผู้ใช้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
