import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import { LuSearch } from "react-icons/lu";
import knowledgeData from "../../utils/mock_data";
import HCard from "../../components/user/HCard";
import Footer from "../../components/user/Footer";
import Pagination from "../../components/user/Pagination";
import NotFoundCard from "../../components/user/NotFoundCard";

function Research() {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(knowledgeData.length / itemsPerPage);

  // ฟังก์ชันจัดการการค้นหา
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setQuery(searchTerm.trim());
    }
  };

  // ฟังก์ชันจัดการการกดปุ่ม Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // คำนวณช่วงของข้อมูลที่ต้องแสดงในหน้านี้
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPost = knowledgeData.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      {/* main container */}
      <div className="lg:w-[1280px] mx-auto flex gap-10">
        {/* sub-container */}
        <div className="w-[70%] mt-5 mb-20">
          {/* search */}
          <div className="w-full lg:h-[50px] rounded-full bg-[#f6f6f6] flex items-center pl-[20px] focus-within:ring-1 focus-within:ring-sea-blue">
            <LuSearch size={24} className="opacity-50" />
            <input
              type="text"
              name=""
              id=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <div className="flex flex-col gap-4">
                {currentPost.map((post) => (
                  <HCard key={post.id} data={post} />
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
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* side container */}
        <div className="w-[30%]">
          <div className=" sticky top-[70px] ">
            <div className="text-lg font-semibold border-b-[1px] lg:pt-7 lg:pb-1 ">
              งานวิจัยที่แนะนำ
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Research;
