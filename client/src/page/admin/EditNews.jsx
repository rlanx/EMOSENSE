import React from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import ContentForm from "../../components/admin/ContentForm";

export default function EditNews() {
  const handleUpdateNews = (data) => {
    console.log("แก้ไขข่าวสาร:", data);
    // TODO: ส่งข้อมูลไปยัง API
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[250px] flex flex-1 flex-col gap-5 p-6 items-center">
          <ContentForm
            type="news"
            pageName="แก้ไขความรู้ทั่วไป / ข่าวสาร"
            onSubmit={handleUpdateNews}
          />
        </div>
      </div>
    </div>
  );
}
