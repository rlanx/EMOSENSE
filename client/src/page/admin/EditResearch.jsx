import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import ContentForm from "../../components/admin/ContentForm";

import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  updateContentById,
  getContentById,
} from "../../utils/func/adminService";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function EditResearch() {
  const { id } = useParams(); // ดึง ID จาก URL
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null); // State สำหรับข้อมูลเดิม
  const [loading, setLoading] = useState(true); // สำหรับโหลดข้อมูล

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // ดึงข้อมูลงานวิจัยตาม ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContentById("research", id);
        setInitialData(data);
      } catch (error) {
        toast.error(`ไม่สามารถโหลดข้อมูล: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateResearch = async (data, errorMsg) => {
    if (errorMsg) return toast.error(errorMsg); // แสดง error ที่ส่งมาจาก ContentForm

    Swal.fire({
      title: "ยืนยันการแก้ไขงานวิจัย?",
      text: "คุณต้องการบันทึกการแก้ไขนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "แก้ไข",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const loadingToast = toast.loading("กำลังบันทึก...");
        try {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value)
          );
          await updateContentById("research", id, formData);
          toast.dismiss(loadingToast);
          toast.success("แก้ไขข้อมูลสำเร็จ!");
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
            type="research"
            pageName="แก้ไขงานวิจัย"
            onSubmit={handleUpdateResearch}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}
