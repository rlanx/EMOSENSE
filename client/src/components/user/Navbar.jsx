import React, { useEffect, useState, useRef } from "react";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import menuList from "../../utils/json/navbar";
import { User, History, Settings, LogOut, UserCog } from "lucide-react";
import { getUserAPI, logoutUserAPI } from "../../utils/ApiRoute";
import Swal from "sweetalert2";

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // ใช้ useRef เก็บอ้างอิง dropdown

  const navigate = useNavigate();

  // ดึงข้อมูล user
  useEffect(() => {
    axios
      .get(getUserAPI, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(true);
        setUsername(res.data.username);
        setIsAdmin(res.data.role === "admin");
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUsername("");
      });
  }, []);

  // logout function
  const handleLogout = async () => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการออกจากระบบ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6F61",
      cancelButtonColor: "#5BC0BE",
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(logoutUserAPI, {}, { withCredentials: true });
          setIsLoggedIn(false);
          setIsAdmin(false);
          setUsername("");

          Swal.fire({
            title: "ออกจากระบบสำเร็จ!",
            text: "คุณออกจากระบบเรียบร้อยแล้ว",
            icon: "success",
            confirmButtonColor: "#5BC0BE",
          }).then(() => {
            navigate("/"); // กลับไปหน้าแรกหลังจากออกจากระบบ
          });
        } catch (error) {
          console.error("Logout Error:", error);
          Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถออกจากระบบได้", "error");
        }
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // เมนู Dropdown สำหรับผู้ใช้ทั่วไป
  const dropdownMenu = [
    {
      name: "ประวัติการวิเคราะห์",
      path: "/history",
      icon: <History size={22} />,
    },
    { name: "ตั้งค่าบัญชี", path: "/my-account", icon: <Settings size={22} /> },
  ];

  // เมนูสำหรับ Admin เท่านั้น
  if (isAdmin) {
    dropdownMenu.unshift({
      name: "Admin Panel",
      path: "/dashboard",
      icon: <UserCog size={22} />,
    });
  }

  return (
    <div
      className={`z-20 sticky top-0 left-0 w-full bg-white text-grey flex items-center justify-center lg:h-[70px] ${
        isScrolled ? "border-b-[1px]" : "bg-transparent"
      }`}
    >
      <div className="w-full px-7 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center lg:gap-7">
          <Link to={"/"} className="text-[28px] font-semibold">
            <span className="text-sea-blue">EMO</span>SENSE
          </Link>
          <div className="flex gap-7 ">
            {menuList?.map((menu) => {
              const isActive = location?.pathname === menu?.menu_path;
              return (
                <Link
                  to={menu.menu_path}
                  key={menu.menu_id}
                  className={`relative group`}
                >
                  <p className={``}>{menu.menu_name}</p>
                  <div
                    className={`absolute left-0 bottom-[-8px] w-full h-[2px] bg-sea-blue
                        transition-transform origin-center ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                  ></div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            {/* user icon */}
            <div
              onClick={toggleDropdown}
              className=" size-[40px] flex items-center justify-center bg-[#47b9b7bd] rounded-full text-white cursor-pointer"
            >
              <User />
            </div>

            {/* dropdown menu */}
            <div
              className={`absolute lg:w-[230px] px-5 py-4 right-0 mt-5  rounded-lg bg-white border-[1px] shadow-md  z-10 transition-all duration-300 ease-out ${
                dropdownOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <ul>
                <li className="text-center pb-2 mb-1 border-b-[1px]">
                  {username}
                </li>

                {dropdownMenu.map((item, index) => (
                  <Link key={index} to={item.path}>
                    <li className="flex items-center py-2 rounded-lg hover:bg-gray-100">
                      <span className="basis-1/4 flex justify-center">
                        {item.icon}
                      </span>
                      {item.name}
                    </li>
                  </Link>
                ))}
                {/* log-out button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center py-2 text-white bg-error rounded-lg"
                >
                  <LogOut size={22} className="basis-1/4" />
                  ออกจากระบบ
                </button>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to={"/login"}
              className="flex items-center justify-center lg:px-4 lg:h-[40px] lg:rounded-lg"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              to={"/register"}
              className="flex items-center justify-center bg-sea-blue text-white lg:px-4 lg:h-[40px] lg:rounded-lg hover:bg-[#47b9b7]"
            >
              สมัครสมาชิก
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
