import React from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import ContentForm from "../../components/admin/ContentForm";

export default function AddResearch() {
  const handleResearchSubmit = (data) => {
    console.log("เพิ่มงานวิจัย:", data);
    // TODO: ส่งข้อมูลไปยัง API
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[250px] flex flex-1 flex-col gap-5 p-6 items-center">
          <ContentForm
            type="research"
            pageName="เพิ่มงานวิจัย"
            onSubmit={handleResearchSubmit}
          />
        </div>
      </div>
    </div>
  );
}
