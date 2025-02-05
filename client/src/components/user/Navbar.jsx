import React, { useEffect, useState, useRef } from "react";
import { Link, Links, useLocation } from "react-router-dom";
import menuList from "../../utils/navbar";
import { User, History, Settings, LogOut } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // ใช้ useRef เก็บอ้างอิง dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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

  return (
    <div
      className={`z-20 sticky top-0 left-0 w-full bg-white text-grey flex items-center justify-center lg:h-[70px] ${
        isScrolled ? "border-b-[1px]" : "bg-transparent"
      }`}
    >
      <div className="w-[1280px] flex items-center justify-between">
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
                  user12345
                </li>
                <Link to={"/history"}>
                  <li className="flex items-center py-2  rounded-lg hover:bg-gray-200 ">
                    <History size={22} className="basis-1/4" />
                    ประวัติการวิเคราะห์
                  </li>
                </Link>
                <Link to={"/account"}>
                  <li className="flex items-center py-2  rounded-lg hover:bg-gray-200">
                    <Settings size={22} className="basis-1/4" />
                    ตั้งค่าบัญชี
                  </li>
                </Link>
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
              className="flex items-center justify-center lg:w-[100px] lg:h-[40px] lg:rounded-lg"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              to={"/register"}
              className="flex items-center justify-center bg-sea-blue text-white lg:w-[100px] lg:h-[40px] lg:rounded-lg hover:bg-[#47b9b7]"
            >
              ลงทะเบียน
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
