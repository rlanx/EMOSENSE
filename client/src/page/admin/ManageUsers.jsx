import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Pagination from "../../components/user/Pagination";
import { History, UserPen, UserX, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

//data
import usersData from "../../utils/json/mock_users";

export default function ManageUsers() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  // คำนวณช่วงของข้อมูลที่ต้องแสดงในหน้านี้
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecord = usersData.slice(startIndex, endIndex);

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การลบผู้ใช้จะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Deleted user with ID: ${userId}`);
        Swal.fire("ลบสำเร็จ!", "ผู้ใช้ถูกลบเรียบร้อยแล้ว", "success");
      }
    });
  };

  const actionButtons = [
    {
      icon: <History size={22} />,
      action: "viewHistory",
      tooltip: "ดูประวัติ",
      path: "/users/history",
      color: "bg-gray-400",
    },
    {
      icon: <UserPen size={22} />,
      action: "editUser",
      tooltip: "แก้ไขผู้ใช้",
      path: "/users/edit",
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
          <Link to={"/users/add"}>
            <button className="lg:w-[145px] bg-primary text-white flex py-3 px-3 rounded-lg">
              <Plus className="basis-1/4" />
              <p className="basis-3/4">เพิ่มผู้ใช้</p>
            </button>
          </Link>

          {/* table */}
          <div className="w-full ">
            {/* table head */}
            <div className="w-full flex bg-primary rounded-t-lg text-white ">
              <div className="basis-1/12 py-3 px-4">ID</div>
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
                      <div className="basis-1/12 py-3 px-4">{user.id}</div>
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
                        {actionButtons.map((btn, index) =>
                          btn.action === "deleteUser" ? (
                            <button
                              key={index}
                              className={`${btn.color} p-2 rounded-md text-white`}
                              onClick={() => handleDeleteUser(user.id)}
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
