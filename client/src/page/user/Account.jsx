import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import UserInp from "../../components/user/UserInp";
import { LuUser, LuLock } from "react-icons/lu";
import { User, Pencil } from "lucide-react";
import Footer from "../../components/user/Footer";
import { Toaster, toast } from "react-hot-toast";
import { getUser, updateUser } from "../../utils/func/apiService";
import { host } from "../../utils/ApiRoute";
import Swal from "sweetalert2";

export default function Account() {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // ดึงข้อมูลผู้ใช้
  useEffect(() => {
    getUser().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        setUsername(data.username);
        setPreviewImage(data.profileImage ? `${host}${data.profileImage}` : "");
      }
    });
  }, []);

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

  // อัปโหลดรูปภาพ
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // แสดงตัวอย่างภาพที่อัปโหลด
    }
  };

  // บันทึกการเปลี่ยนแปลง
  const handleSave = async () => {
    if (newPassword && !validatePassword(newPassword)) {
      toast.error(
        "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว และต้องมีตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ"
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    // ใช้ SweetAlert เพื่อยืนยันก่อนอัปเดต
    Swal.fire({
      title: "ยืนยันการแก้ไข?",
      text: "คุณต้องการบันทึกข้อมูลหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("newUsername", username);
        formData.append("newPassword", newPassword);
        formData.append("confirmPassword", confirmPassword);
        if (profileImage) {
          formData.append("profileImage", profileImage);
        }

        toast.promise(updateUser(formData), {
          loading: "กำลังบันทึกข้อมูล...",
          success: (response) => {
            setPreviewImage(
              response.profileImage ? `${host}${response.profileImage}` : ""
            ); // รีเฟรชรูปภาพหลังอัปเดต
            setNewPassword("");
            setConfirmPassword("");
            return "อัปเดตข้อมูลสำเร็จ!";
          },
          error: (err) => `${err.message || "เกิดข้อผิดพลาด"}`,
        });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      {/* main container */}
      <div className="lg:w-[1280px] mx-auto flex flex-col gap-5 justify-center items-center mt-5 mb-10">
        {/* title */}
        <p className="px-5 text-center text-2xl font-semibold border-b-[3px] border-primary pb-2">
          ตั้งค่าบัญชี
        </p>
        {/* form */}
        <div className="lg:max-w-[620px] flex gap-10 p-10 border-[1px] shadow-md rounded-3xl">
          {/* info container */}
          <div className="flex flex-col items-center  gap-5">
            <p className="text-xl text-center font-semibold">แก้ไขรูปโปรไฟล์</p>
            <div className="bg-[#f5f5f5] rounded-full overflow-hidden size-[200px] flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="size-full object-cover object-top"
                />
              ) : (
                <User size={50} strokeWidth={1} className="text-gray-500" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="upload"
              className="relative group w-fit bg-light-blue text-sea-blue cursor-pointer"
            >
              อัปโหลดรูปภาพ
              <div
                className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-sea-blue
                        transition-transform origin-center scale-x-0 group-hover:scale-x-100"
              ></div>
            </label>
          </div>

          {/* input container */}
          <div className="flex flex-col gap-3 items-end text-grey">
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

            {/* password */}
            {/* <div className="w-full space-y-1">
              <label>รหัสผ่าน</label>
              <UserInp
                Icon={LuLock}
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
              />
            </div> */}

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
              className={`flex items-center gap-2 h-11 px-5 rounded-lg text-white bg-primary  `}
              onClick={handleSave}
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
