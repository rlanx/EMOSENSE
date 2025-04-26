import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Pagination from "../../components/user/Pagination";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import Swal from "sweetalert2";
import NotFoundCard from "../../components/user/NotFoundCard";
import { Link, useSearchParams } from "react-router-dom";
import {
  getAllResearch,
  deleteContentById,
} from "../../utils/func/adminService";
import { Toaster, toast } from "react-hot-toast";

export default function ManageResearch() {
  const [researchList, setResearchList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(researchList.length / itemsPerPage);

  // ดึงข้อมูลงานวิจัย
  useEffect(() => {
    getAllResearch()
      .then((data) => setResearchList(data))
      .catch((error) => toast.error(`${error.message}`));
  }, []);

  // อัปเดต URL เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  // คำนวณช่วงข้อมูล
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecord = researchList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDeleteResearch = (researchId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบงานวิจัยนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteContentById("research", researchId);
        if (response.error) {
          Swal.fire("เกิดข้อผิดพลาด!", response.error, "error");
          // toast.error(response.error);
        } else {
          Swal.fire("ลบสำเร็จ!", "ลบงานวิจัยเรียบร้อยแล้ว", "success");
          // toast.success("ลบข่าวสารสำเร็จ!");
          setResearchList(
            researchList.filter(
              (research) => research.research_id !== researchId
            )
          );
        }
      }
    });
  };

  const actionButtons = [
    {
      icon: <Eye size={22} />,
      action: "previewPost",
      path: "/research",
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
      action: "deleteResearch",
      color: "bg-error",
    },
  ];

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-1">
        <Sidebar />
        {/* content container */}
        <div className="ml-[250px] flex flex-1 flex-col gap-3 p-6">
          <p className="text-3xl text-grey font-semibold">จัดการงานวิจัย</p>

          {/* add research */}
          <Link to={"/manage-research/add"} className="w-fit">
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
                      <div className="basis-1/12 py-3 px-4">
                        {post.research_id}
                      </div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate xl:max-2xl:max-w-[300px]">
                        {post.title}
                      </div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate xl:max-2xl:max-w-[300px]">
                        {post.author}
                      </div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>

                      {/* action button */}
                      <div className="basis-2/12 py-3 px-4 flex gap-2">
                        {actionButtons.map((btn, idx) =>
                          btn.action === "deleteResearch" ? (
                            <button
                              key={idx}
                              className={`${btn.color} p-2 rounded-md text-white`}
                              onClick={() =>
                                handleDeleteResearch(post.research_id)
                              }
                            >
                              {btn.icon}
                            </button>
                          ) : (
                            <Link
                              to={`${btn.path}/${post.research_id}?page=${currentPage}`}
                              key={idx}
                            >
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
                <NotFoundCard />
              )}
            </div>

            {/* pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={(page) => {
                setCurrentPage(page);
                setSearchParams({ page });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
