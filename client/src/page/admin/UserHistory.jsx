import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Pagination from "../../components/user/Pagination";

import AnalysisReport from "../../utils/mock_analysis_report";

export default function UserHistory() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(AnalysisReport.length / itemsPerPage);

  // คำนวณช่วงของข้อมูลที่ต้องแสดงในหน้านี้
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecord = AnalysisReport.slice(startIndex, endIndex);
  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* content container */}
        <div className="ml-[250px] flex flex-1 flex-col gap-4 p-6 ">
          {/* title */}
          <p className="w-fit pr-3 text-center text-2xl font-semibold border-b-[3px] border-primary pb-1">
            ประวัติการวิเคราะห์ของ user1234
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
            <div className="w-full flex bg-primary rounded-t-lg text-white">
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
                      <div className="basis-2/12 py-3 px-4">{post.date}</div>
                      <div className="basis-7/12 py-3 px-4 whitespace-nowrap truncate">
                        {post.text}
                      </div>
                      <div className="basis-3/12 py-3 px-4 flex gap-4">
                        <div className="basis-1/2 text-center rounded-md py-1 bg-accent text-white">
                          {post.depression_percentage}%
                        </div>
                        <div className="basis-1/2 text-center rounded-md py-1 bg-error text-white">
                          {post.non_depression_percentage}%
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
      </div>
    </div>
  );
}
