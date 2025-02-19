import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import UserInp from "../../components/user/UserInp";
import { LuUser, LuLock } from "react-icons/lu";
import { User, Pencil, Save } from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";
import RoleSelector from "../../components/admin/RoleSelector";
import { getUserById, updateUserByAdmin } from "../../utils/func/adminService";
import { Toaster, toast } from "react-hot-toast";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditUser() {
  const { id } = useParams(); // ดึง user_id จาก URL
  const [originalUsername, setOriginalUsername] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้เมื่อโหลดหน้า
  useEffect(() => {
    getUserById(id).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        setOriginalUsername(data.username);
        setUsername(data.username);
        setSelectedRole(data.role);
      }
    });
  }, [id]);

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
  const handleSave = async () => {
    if (newPassword && !validatePassword(newPassword)) {
      toast.error(
        "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว และต้องมีตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ",
        { duration: 4000, position: "top-center" } // สามารถกำหนดตำแหน่งและเวลาแสดงได้
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    Swal.fire({
      title: "ยืนยันการบันทึกข้อมูล?",
      text: "คุณต้องการบันทึกการเปลี่ยนแปลงนี้หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // หากผู้ใช้ยืนยันการบันทึก
        const response = await updateUserByAdmin(
          id,
          username,
          newPassword,
          selectedRole
        );

        if (response.error) {
          toast.error(response.error); // แสดง Toast หากเกิดข้อผิดพลาด
        } else {
          toast.success("อัปเดตข้อมูลสำเร็จ! กำลังกลับไปหน้าที่เดิม...");
          setTimeout(() => navigate(`/users?page=${page}`), 1500); // กลับไปหน้าก่อนหน้า

          // Swal.fire({
          //   title: "บันทึกสำเร็จ!",
          //   text: "ข้อมูลผู้ใช้ถูกอัปเดตเรียบร้อยแล้ว",
          //   icon: "success",
          //   confirmButtonColor: "#5BC0BE",
          // }).then(() => navigate(`/users?page=${page}`));
        }
      }
    });
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
            แก้ไขข้อมูลผู้ใช้ {originalUsername}
          </p>

          <div className="w-[450px]">
            {/* input container */}
            <div className="flex flex-col gap-4 items-end text-grey">
              {/* username */}
              <div className="w-full space-y-1">
                <label>ชื่อผู้ใช้</label>
                <UserInp
                  Icon={LuUser}
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                    รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว และต้องมีตัวพิมพ์ใหญ่,
                    ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ
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
                onClick={handleSave}
                className={`flex items-center gap-2 h-12 px-5 rounded-lg text-white bg-primary`}
              >
                <Save size={20} />
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
