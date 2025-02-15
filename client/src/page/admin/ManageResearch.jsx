import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Pagination from "../../components/user/Pagination";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

//data
import knowledgeData from "../../utils/json/mock_data";

export default function ManageResearch() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(knowledgeData.length / itemsPerPage);

  // คำนวณช่วงของข้อมูลที่ต้องแสดงในหน้านี้
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecord = knowledgeData.slice(startIndex, endIndex);

  const handleDeletePost = (researchId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การลบโพสต์จะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Deleted post with ID: ${researchId}`);
        Swal.fire("ลบสำเร็จ!", "โพสต์ถูกลบเรียบร้อยแล้ว", "success");
      }
    });
  };

  const actionButtons = [
    {
      icon: <Eye size={22} />,
      action: "previewPost",
      path: "/news/ex",
      color: "bg-gray-400",
    },
    {
      icon: <Pencil size={22} />,
      action: "editPost",
      path: "/manage-research/edit",
      color: "bg-accent",
    },
    {
      icon: <Trash2 size={22} />,
      action: "deletePost",
      color: "bg-error",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* content container */}
        <div className="ml-[250px] flex flex-1 flex-col gap-3 p-6">
          <p className="text-3xl text-grey font-semibold">จัดการงานวิจัย</p>

          {/* add research */}
          <Link to={"/manage-research/add"}>
            <button className="lg:w-[145px] bg-primary text-white flex py-3 px-3 rounded-lg">
              <Plus className="basis-1/4" />
              <p className="basis-3/4">เพิ่มงานวิจัย</p>
            </button>
          </Link>

          {/* table */}
          <div className="w-full ">
            {/* table head */}
            <div className="w-full flex bg-primary rounded-t-lg text-white ">
              <div className="basis-1/12 py-3 px-4">ID</div>
              <div className="basis-4/12 py-3 px-4">ชื่อเรื่อง</div>
              <div className="basis-4/12 py-3 px-4">ผู้เขียน / แหล่งที่มา</div>
              <div className="basis-4/12 py-3 px-4">วันที่เผยแพร่</div>
              <div className="basis-2/12 py-3 px-4">ตัวเลือก</div>
            </div>

            {/* table body */}
            <div className="w-full lg:min-h-[400px]">
              {currentRecord.length > 0 ? (
                <div className="w-full ">
                  {currentRecord.map((post, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <div className="basis-1/12 py-3 px-4">{post.id}</div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate">
                        {post.title}
                      </div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate">
                        {post.author}
                      </div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate">
                        {post.date}
                      </div>

                      {/* action button */}
                      <div className="basis-2/12 py-3 px-4 flex gap-2">
                        {actionButtons.map((btn, index) =>
                          btn.action === "deletePost" ? (
                            <button
                              key={index}
                              className={`${btn.color} p-2 rounded-md text-white`}
                              onClick={() => handleDeletePost(post.id)}
                            >
                              {btn.icon}
                            </button>
                          ) : (
                            <Link to={btn.path} key={index}>
                              <button
                                className={`${btn.color} p-2 rounded-md text-white`}
                              >
                                {btn.icon}
                              </button>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full text-center">ไม่มีรายการ</div>
              )}
            </div>

            {/* pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
