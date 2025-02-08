import React from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import CountUp from "react-countup";
import { Users, Newspaper, BookOpen, MessageCircle } from "lucide-react";

export default function Dashboard() {
  const summaryData = [
    {
      title: "Total Users",
      value: 1245,
      icon: <Users size={32} />,
      color: "bg-blue-300",
    },
    {
      title: "News Articles",
      value: 132,
      icon: <Newspaper size={32} />,
      color: "bg-green-300",
    },
    {
      title: "Research Papers",
      value: 27,
      icon: <BookOpen size={32} />,
      color: "bg-yellow-200",
    },
    {
      title: "Analyzed Messages",
      value: 5421,
      icon: <MessageCircle size={32} />,
      color: "bg-red-300",
    },
  ];

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
                className={`flex flex-col items-center gap-2 text-grey p-10 rounded-xl ${data.color} shadow-md`}
              >
                {/* title */}
                <div className="flex items-center gap-2">
                  {data.icon}
                  <p className="text-xl">{data.title}</p>
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
