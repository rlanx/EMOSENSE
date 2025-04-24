import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import { LuSearch } from "react-icons/lu";
import knowledgeData from "../../utils/json/mock_data";
import HCard from "../../components/user/HCard";
import Footer from "../../components/user/Footer";
import Pagination from "../../components/user/Pagination";
import NotFoundCard from "../../components/user/NotFoundCard";
import { Link, useSearchParams } from "react-router-dom";
import { getAllResearch } from "../../utils/func/adminService";
import { searchResearch } from "../../utils/func/userService";
import { UserPen, Calendar } from "lucide-react";
import { host } from "../../utils/ApiRoute";

function Research() {
  const [searchQuery, setSearchQuery] = useState("");
  const [researchList, setResearchList] = useState([]);
  const [recResearch, setRecResearch] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(researchList.length / itemsPerPage);

  const recommendResearch = recResearch.slice(0, 4);

  // ดึงข้อมูลงานวิจัย
  useEffect(() => {
    if (searchQuery) {
      fetchResearch();
    } else {
      getAllResearch(searchQuery)
        .then((data) => {
          setResearchList(data);
          setRecResearch(data);
        })
        .catch((error) => toast.error(`${error.message}`));
    }
  }, [searchQuery]);

  const fetchResearch = async () => {
    const results = await searchResearch(""); // ค้นหาทั้งหมดโดยไม่ระบุ query
    if (!results.error) {
      setResearchList(results);
    }
  };

  // อัปเดต URL เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  // ฟังก์ชันจัดการการค้นหา
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchResearch(); // โหลดข่าวทั้งหมดถ้าไม่ได้ใส่คำค้นหา
      return;
    }

    const results = await searchResearch(searchQuery);
    if (!results.error) {
      setResearchList(results);
    }

    setQuery(searchQuery);
  };

  // ฟังก์ชันจัดการการกดปุ่ม Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // คำนวณช่วงข้อมูล
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPost = researchList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Navbar />
      {/* main container */}
      <div className="min-h-[55vh] lg:w-[1280px] mx-auto flex gap-10">
        {/* sub-container */}
        <div className="w-[70%] mt-5 mb-20">
          {/* search */}
          <div className="w-full lg:h-[50px] rounded-full bg-[#f6f6f6] flex items-center pl-[20px] focus-within:ring-1 focus-within:ring-sea-blue">
            <LuSearch size={24} className="opacity-50" />
            <input
              type="text"
              name=""
              id=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-[#f6f6f6] outline-none mx-[10px]"
            />
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 h-[40px] bg-sea-blue text-white px-4 rounded-full mr-[5px]"
            >
              <LuSearch size={18} />
              ค้นหา
            </button>
          </div>

          {/* ข้อความการค้นหา */}
          {query && (
            <div className="mt-7">
              <p className="text-xl font-medium flex text-nowrap">
                <p>ผลการค้นหาสำหรับ</p>
                <p className="text-primary ml-2 truncate">"{query}"</p>
              </p>
            </div>
          )}

          {/* research container */}
          <div className="">
            {currentPost.length > 0 ? (
              <div className="flex flex-col">
                {currentPost.map((post) => (
                  <Link
                    to={`${post.research_id}?page=${currentPage}`}
                    key={post.news_id}
                  >
                    <HCard key={post.id} data={post} />
                  </Link>
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

        {/* side container */}
        <div className="w-[30%]">
          <div className=" sticky top-[70px] ">
            <div className="text-lg font-semibold border-b-[1px] lg:pt-7 lg:pb-1 ">
              งานวิจัยที่แนะนำ
            </div>
            {recommendResearch.map((data, idx) => (
              <div
                key={idx}
                className="border-b-[1px] flex justify-between items-center"
              >
                <div className="w-[70%] text-light-grey py-4  space-y-2">
                  {/* Author info */}
                  <div className="flex items-center gap-2">
                    <UserPen size={22} />
                    <p className="truncate">{data.author}</p>
                  </div>
                  {/* title & desc */}
                  <div className="space-y-1">
                    <p className="text-grey font-semibold truncate">
                      {data.title}
                    </p>
                  </div>
                  {/* date */}
                  <div className="flex items-center gap-2">
                    <Calendar size={22} />
                    <p>{new Date(data.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {/* image container */}
                <div className="lg:size-20 overflow-hidden rounded-lg">
                  <img
                    src={`${host}${data.thumbnail}`}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Research;
