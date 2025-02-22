import React from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import ContentForm from "../../components/admin/ContentForm";

import { addNews } from "../../utils/func/adminService";
import { toast } from "react-hot-toast";

export default function AddNews() {
  const handleNewsSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const response = await addNews(formData);

    if (response.error) toast.error(response.error);
    else toast.success("เพิ่มข่าวสารสำเร็จ!");
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[250px] flex flex-1 flex-col gap-5 p-6 items-center">
          <ContentForm
            type="news"
            pageName="เพิ่มความรู้ทั่วไป / ข่าวสาร"
            onSubmit={handleNewsSubmit}
          />
        </div>
      </div>
    </div>
  );
}
