import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Pagination from "../../components/user/Pagination";
import { History, UserPen, UserX, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";

import { getUsers, deleteUserByAdmin } from "../../utils/func/adminService";
import { useSearchParams } from "react-router-dom";

import NotFoundCard from "../../components/user/NotFoundCard";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const itemsPerPage = 10; // จำนวนบทความต่อหน้า
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // ดึงข้อมูลผู้ใช้
  useEffect(() => {
    getUsers().then((data) => {
      if (data.error) {
        Swal.fire("เกิดข้อผิดพลาด!", data.error, "error");
      } else {
        setUsers(data);
      }
    });
  }, []);

  // อัปเดต URL เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  // คำนวณช่วงของข้อมูลที่ต้องแสดงในหน้านี้
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecord = users.slice(startIndex, endIndex);

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUserByAdmin(userId);
        if (response.error) {
          // toast.error(response.error);
          Swal.fire("เกิดข้อผิดพลาด!", response.error, "error");
        } else {
          // toast.success("ลบผู้ใช้สำเร็จ!");
          Swal.fire("ลบสำเร็จ!", "ผู้ใช้ถูกลบเรียบร้อยแล้ว", "success");
          setUsers(users.filter((user) => user.user_id !== userId)); // ลบผู้ใช้จาก UI
        }
      }
    });
  };

  const actionButtons = [
    {
      icon: <History size={22} />,
      action: "viewHistory",
      tooltip: "ดูประวัติ",
      path: `/users/history`,
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
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-1">
        <Sidebar />
        {/* content container */}
        <div className="ml-[250px] flex flex-1 flex-col gap-3 p-6">
          <p className="text-3xl text-grey font-semibold">จัดการผู้ใช้</p>

          {/* add user */}
          <Link to={"/users/add"} className="w-fit">
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
                      <div className="basis-1/12 py-3 px-4">{user.user_id}</div>
                      <div className="basis-3/12 py-3 px-4 whitespace-nowrap truncate">
                        {user.username}
                      </div>
                      <div className="basis-3/12 py-3 px-4 whitespace-nowrap truncate">
                        {user.role}
                      </div>
                      <div className="basis-3/12 py-3 px-4 whitespace-nowrap truncate">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>

                      {/* action button */}
                      <div className="basis-2/12 py-3 px-4 flex gap-2 ">
                        {actionButtons.map((btn, index) =>
                          btn.action === "deleteUser" ? (
                            <button
                              key={index}
                              className={`${btn.color} p-2 rounded-md text-white`}
                              onClick={() => handleDeleteUser(user.user_id)}
                            >
                              {btn.icon}
                            </button>
                          ) : (
                            <Link
                              to={`${btn.path}/${user.user_id}?page=${currentPage}`}
                              key={index}
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
