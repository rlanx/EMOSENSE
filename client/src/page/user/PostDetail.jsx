import React, { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import axios from "axios";
import { UserPen, Calendar } from "lucide-react";
import knowledgeData from "../../utils/json/mock_data";
import Footer from "../../components/user/Footer";
import { host } from "../../utils/ApiRoute";

import { useParams } from "react-router-dom";
import { getContentById } from "../../utils/func/adminService";
import { Toaster, toast } from "react-hot-toast";

export default function KnowledgeDetail() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentData = await getContentById(type, id);
        setData(contentData);
      } catch (error) {
        toast.error(`${error.message}`);
      }
    };
    fetchData();
  }, [type, id]);

  return (
    <div>
      <Navbar />
      <div className="lg:w-[680px] mx-auto pt-5 pb-12">
        {data ? (
          <div className="text-grey">
            {/* title & desc */}
            <div>
              <p className="text-4xl font-bold">{data.title}</p>
              <p className="text-xl text-light-grey my-5">{data.desc}</p>
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
                <p>{new Date(data.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* image */}
            <div className="my-7 w-full h-[350px] rounded-lg overflow-hidden">
              <img
                src={data.thumbnail}
                alt="ภาพปก"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* detail */}
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
