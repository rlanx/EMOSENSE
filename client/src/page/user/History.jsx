import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import { getUserHistory } from "../../utils/func/userService";

// mock-data
import AnalysisReport from "../../utils/json/mock_analysis_report";
import Pagination from "../../components/user/Pagination";
import Footer from "../../components/user/Footer";

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [history, setHistory] = useState([]);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(history.length / itemsPerPage);

  // คำนวณช่วงของข้อมูลที่ต้องแสดงในหน้านี้
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecord = history.slice(startIndex, endIndex);

  useEffect(() => {
    getUserHistory().then((data) => {
      if (!data.error) {
        setHistory(data);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      {/* main container */}
      <div className="lg:w-[1280px] mx-auto flex flex-col gap-5 justify-center items-center mt-5 mb-10">
        {/* title */}
        <p className="px-5 text-center text-2xl font-semibold border-b-[3px] border-primary pb-2">
          ประวัติการวิเคราะห์
        </p>

        {/* des */}
        <div className="flex gap-4">
          <p className="font-medium">ผลลัพธ์</p>
          <div className="flex items-center gap-2">
            <div className="size-5 bg-accent rounded"></div>
            depression
          </div>
          <div className="flex items-center gap-2">
            <div className="size-5 bg-error rounded"></div>
            non-depression
          </div>
        </div>

        {/* table */}
        <div className="w-full ">
          {/* table head */}
          <div className="w-full flex bg-primary rounded-t-2xl text-white">
            <div className="basis-2/12 py-3 px-4">เวลา</div>
            <div className="basis-7/12 py-3 px-4">ข้อความ</div>
            <div className="basis-3/12 py-3 px-4">ผลลัพธ์</div>
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
                    <div className="basis-2/12 py-3 px-4">
                      {new Date(post.analysis_date).toLocaleString()}
                    </div>
                    <div className="basis-7/12 py-3 px-4 whitespace-nowrap truncate">
                      {post.input_text}
                    </div>
                    <div className="basis-3/12 py-3 px-4 flex gap-4">
                      <div className="basis-1/2 text-center rounded-md py-1 bg-accent text-white">
                        {post.result.non_depression}%
                      </div>
                      <div className="basis-1/2 text-center rounded-md py-1 bg-error text-white">
                        {post.result.depression}%
                      </div>
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
      <Footer />
    </div>
  );
}
