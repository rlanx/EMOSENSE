import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Pagination from "../../components/user/Pagination";
import { History, UserPen, UserX, Plus } from "lucide-react";

//data
import usersData from "../../utils/mock_users";

export default function ManageUsers() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  // คำนวณช่วงของข้อมูลที่ต้องแสดงในหน้านี้
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecord = usersData.slice(startIndex, endIndex);

  const actionButtons = [
    {
      icon: <History size={22} />,
      action: "viewHistory",
      tooltip: "ดูประวัติ",
      color: "bg-gray-400",
    },
    {
      icon: <UserPen size={22} />,
      action: "editUser",
      tooltip: "แก้ไขผู้ใช้",
      color: "bg-accent",
    },
    {
      icon: <UserX size={22} />,
      action: "deleteUser",
      tooltip: "ลบผู้ใช้",
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
          <p className="text-3xl text-grey font-semibold">จัดการผู้ใช้</p>

          {/* add user */}
          <button className="lg:w-[110px] bg-primary text-white flex py-3 px-3 rounded-lg">
            <Plus className="basis-1/4" />
            <p className="basis-3/4">เพิ่มผู้ใช้</p>
          </button>

          {/* table */}
          <div className="w-full ">
            {/* table head */}
            <div className="w-full flex bg-primary rounded-t-2xl text-white ">
              <div className="basis-2/12 py-3 px-4">ID</div>
              <div className="basis-3/12 py-3 px-4">ชื่อผู้ใช้</div>
              <div className="basis-3/12 py-3 px-4">รหัสผ่าน</div>
              <div className="basis-3/12 py-3 px-4">role</div>
              <div className="basis-3/12 py-3 px-4">สมัครสมาชิกเมื่อ</div>
              <div className="basis-2/12 py-3 px-4">ตัวเลือก</div>
            </div>

            {/* table body */}
            <div className="w-full lg:min-h-[400px]">
              {currentRecord.length > 0 ? (
                <div className="w-full ">
                  {currentRecord.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <div className="basis-2/12 py-3 px-4">{user.id}</div>
                      <div className="basis-3/12 py-3 px-4 whitespace-nowrap truncate">
                        {user.username}
                      </div>
                      <div className="basis-3/12 py-3 px-4 whitespace-nowrap truncate">
                        {user.password}
                      </div>
                      <div className="basis-3/12 py-3 px-4 whitespace-nowrap truncate">
                        {user.role}
                      </div>
                      <div className="basis-3/12 py-3 px-4 whitespace-nowrap truncate">
                        {user.create_at}
                      </div>

                      {/* action button */}
                      <div className="basis-2/12 py-3 px-4 flex gap-2 ">
                        {actionButtons.map((btn, index) => (
                          <button
                            key={index}
                            className={`${btn.color} p-2 rounded-md text-white `}
                          >
                            {btn.icon}
                          </button>
                        ))}
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
