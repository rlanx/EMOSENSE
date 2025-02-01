import React, { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import axios from "axios";
import { UserPen, Calendar } from "lucide-react";
import knowledgeData from "../../utils/mock_data";
import Footer from "../../components/user/Footer";

export default function KnowledgeDetail() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // ตัวอย่างการค้นหาข้อมูลตาม ID (เช่น ID = 3)
    const articleData = knowledgeData.find((item) => item.id === 3);
    setData(articleData);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="lg:w-[680px] mx-auto pt-5 pb-12">
        {data ? (
          <div className="text-grey">
            {/* title & desc */}
            <div>
              <p className="text-4xl font-bold mb-1">{data.title}</p>
              <p className="text-xl text-light-grey">{data.desc}</p>
            </div>

            <div className="mt-2 flex flex-col gap-1">
              {/* author */}
              <div className="flex items-center gap-2">
                <UserPen size={22} />
                <p>{data.author}</p>
              </div>

              {/* date */}
              <div className="flex items-center gap-2">
                <Calendar size={22} />
                <p>{data.date}</p>
              </div>
            </div>

            {/* image */}
            <div className="my-7 w-full h-[350px] rounded-lg overflow-hidden">
              <img
                src="/src/assets/default-image.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* detail */}
            <div>{data.details}</div>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
