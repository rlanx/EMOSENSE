import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Pagination from "../../components/user/Pagination";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import Swal from "sweetalert2";
import { Link, useSearchParams } from "react-router-dom";

//data
import knowledgeData from "../../utils/json/mock_data";
import NotFoundCard from "../../components/user/NotFoundCard";

import { getAllNews } from "../../utils/func/adminService";
import { Toaster, toast } from "react-hot-toast";

export default function ManageKnowledge() {
  const [newsList, setNewsList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  // ดึงข้อมูลข่าวสารเมื่อโหลดหน้า
  useEffect(() => {
    getAllNews()
      .then((data) => setNewsList(data))
      .catch((error) => toast.error(`${error.message}`));
  }, []);

  // อัปเดต URL เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  // คำนวณช่วงข้อมูล
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecord = newsList.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteNews = (newsId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การลบข่าวสารจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteNewsByAdmin(newsId);
        if (response.error) {
          toast.error(`${response.error}`);
        } else {
          toast.success("ลบข่าวสารสำเร็จ!");
          setNewsList(newsList.filter((news) => news.news_id !== newsId));
        }
      }
    });
  };

  const actionButtons = [
    {
      icon: <Eye size={22} />,
      action: "previewPost",
      path: "/news",
      color: "bg-gray-400",
    },
    {
      icon: <Pencil size={22} />,
      action: "editPost",
      path: "/manage-news/edit",
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
          <p className="text-3xl text-grey font-semibold">
            จัดการความรู้ทั่วไป / ข่าวสาร
          </p>

          {/* add news */}
          <Link to={"/manage-news/add"} className="w-fit">
            <button className="lg:w-[145px] bg-primary text-white flex py-3 px-3 rounded-lg">
              <Plus className="basis-1/4" />
              <p className="basis-3/4">เพิ่มข่าวสาร</p>
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
                      <div className="basis-1/12 py-3 px-4">{post.news_id}</div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate">
                        {post.title}
                      </div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate">
                        {post.author}
                      </div>
                      <div className="basis-4/12 py-3 px-4 whitespace-nowrap truncate">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>

                      {/* action button */}
                      <div className="basis-2/12 py-3 px-4 flex gap-2">
                        {actionButtons.map((btn, idx) =>
                          btn.action === "deleteNews" ? (
                            <button
                              key={idx}
                              className={`${btn.color} p-2 rounded-md text-white`}
                              onClick={() => handleDeleteNews(post.news_id)}
                            >
                              {btn.icon}
                            </button>
                          ) : (
                            <Link
                              to={`${btn.path}/${post.news_id}?page=${currentPage}`}
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
