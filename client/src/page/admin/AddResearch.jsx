import React from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import ContentForm from "../../components/admin/ContentForm";

import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { addResearch } from "../../utils/func/adminService";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function AddResearch() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const navigate = useNavigate();

  const handleResearchSubmit = async (data, errorMsg) => {
    if (errorMsg) return toast.error(errorMsg); // แสดง error ที่ส่งมาจาก ContentForm

    Swal.fire({
      title: "ยืนยันการเพิ่มงานวิจัย?",
      text: "คุณต้องการเพิ่มงานวิจัยนี้หรือไม่?",
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
          await addResearch(formData);
          toast.dismiss(loadingToast);
          toast.success("เพิ่มงานวิจัยสำเร็จ!");
          setTimeout(() => navigate(`/manage-research?page=${page}`), 1500);
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
            type="research"
            pageName="เพิ่มงานวิจัย"
            onSubmit={handleResearchSubmit}
          />
        </div>
      </div>
    </div>
  );
}
