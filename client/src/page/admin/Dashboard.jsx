import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import CountUp from "react-countup";
import { Users, Newspaper, BookOpen, MessageCircle } from "lucide-react";

import { getDashboardStatsAPI } from "../../utils/ApiRoute";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(getDashboardStatsAPI, {
          withCredentials: true,
        });

        const { userCount, newsCount, researchCount, analysisCount } =
          response.data;

        setSummaryData([
          {
            title: "ผู้ใช้ทั้งหมด",
            value: userCount,
            icon: <Users size={32} />,
            color: "bg-blue-300",
          },
          {
            title: "ความรู้ / ข่าวสารทั้งหมด",
            value: newsCount,
            icon: <Newspaper size={32} />,
            color: "bg-green-300",
          },
          {
            title: "งานวิจัยทั้งหมด",
            value: researchCount,
            icon: <BookOpen size={32} />,
            color: "bg-yellow-200",
          },
          {
            title: "การวิเคราะห์ทั้งหมด",
            value: analysisCount,
            icon: <MessageCircle size={32} />,
            color: "bg-red-300",
          },
        ]);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      }
    };

    fetchStats();
  }, []);

  const [summaryData, setSummaryData] = useState([
    {
      title: "ผู้ใช้ทั้งหมด",
      value: 0,
      icon: <Users size={32} />,
      color: "bg-blue-300",
    },
    {
      title: "ความรู้ / ข่าวสารทั้งหมด",
      value: 0,
      icon: <Newspaper size={32} />,
      color: "bg-green-300",
    },
    {
      title: "งานวิจัยทั้งหมด",
      value: 0,
      icon: <BookOpen size={32} />,
      color: "bg-yellow-200",
    },
    {
      title: "การวิเคราะห์ทั้งหมด",
      value: 0,
      icon: <MessageCircle size={32} />,
      color: "bg-red-300",
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* content container */}
        <div className="ml-[250px] flex flex-1 flex-col gap-3 p-6">
          <p className="text-3xl text-grey font-semibold">Dashboard</p>
          <div className="grid grid-cols-4 gap-3">
            {summaryData.map((data, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 text-grey p-10 rounded-xl ${data.color} shadow-md`}
              >
                {/* title */}
                <div className="flex items-center gap-2">
                  {data.icon}
                  <p className="text-xl whitespace-nowrap">{data.title}</p>
                </div>

                {/* counter */}
                <p className="text-3xl font-semibold">
                  <CountUp
                    start={0}
                    end={data.value}
                    duration={2}
                    separator=","
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
