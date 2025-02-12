import React from "react";
import { LayoutDashboard, Users, Newspaper, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const sidebarMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    { name: "จัดการผู้ใช้", path: "/users", icon: <Users size={22} /> },
    {
      name: "จัดการข่าวสาร",
      path: "/manage-news",
      icon: <Newspaper size={22} />,
    },
    {
      name: "จัดการงานวิจัย",
      path: "/manage-research",
      icon: <BookOpen size={22} />,
    },
  ];

  return (
    <div className="fixed left-0 lg:w-[250px] h-screen p-3  border-r-[1px] bg-gray-200 text-grey">
      <ul className="">
        {sidebarMenu.map((item, index) => {
          const isActive = location?.pathname === item?.path;
          return (
            <Link key={index} to={item.path}>
              <li
                className={`flex items-center p-5 rounded-lg ${
                  isActive ? "bg-white text-grey" : ""
                }`}
              >
                <span className="basis-1/4 flex justify-center">
                  {item.icon}
                </span>
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
