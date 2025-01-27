import React, { useEffect, useState } from "react";
import { Link, Links, useLocation } from "react-router-dom";
import menuList from "../../utils/navbar";

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 left-0 w-full bg-white text-grey flex items-center justify-between lg:h-[70px] lg:px-[300px] ${
        isScrolled ? "border-b-[1px]" : "bg-transparent"
      }`}
    >
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
      <div className="flex gap-4">
        <Link to={"/login"} className="flex items-center justify-center">
          เข้าสู่ระบบ
        </Link>
        <Link
          to={"/register"}
          className="flex items-center justify-center bg-sea-blue text-white lg:w-[100px] lg:h-[40px] lg:rounded-lg hover:bg-[#47b9b7]"
        >
          ลงทะเบียน
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
