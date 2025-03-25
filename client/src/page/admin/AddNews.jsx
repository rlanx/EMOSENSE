import React from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import ContentForm from "../../components/admin/ContentForm";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { addNews } from "../../utils/func/adminService";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function AddNews() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const navigate = useNavigate();

  const handleNewsSubmit = async (data, errorMsg) => {
    if (errorMsg) return toast.error(errorMsg); // แสดง error ที่ส่งมาจาก ContentForm

    Swal.fire({
      title: "ยืนยันการเพิ่มข่าวสาร?",
      text: "คุณต้องการเพิ่มข่าวสารนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "เพิ่ม",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const loadingToast = toast.loading("กำลังเพิ่มข้อมูล...");
        try {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value)
          );
          await addNews(formData);
          toast.dismiss(loadingToast);
          toast.success("เพิ่มความรู้ทั่วไป / ข่าวสารสำเร็จ!");
          setTimeout(() => navigate(`/manage-news?page=${page}`), 1500);
        } catch (error) {
          toast.dismiss(loadingToast);
          toast.error(`เกิดข้อผิดพลาด: ${error.message}`);
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
          <ContentForm
            mode="add"
            type="news"
            pageName="เพิ่มความรู้ทั่วไป / ข่าวสาร"
            onSubmit={handleNewsSubmit}
          />
        </div>
      </div>
    </div>
  );
}
