import React, { useState, useEffect } from "react";
import footerLinks from "../../utils/json/footer";
import { getAllNews, getAllResearch } from "../../utils/func/adminService";
import { Link } from "react-router-dom";

function Footer() {
  const [newsList, setNewsList] = useState([]);
  const [researchList, setResearchList] = useState([]);

  const limitedNews = newsList.slice(0, 4);
  const limitedResearch = researchList.slice(0, 4);

  // console.log(limitedNews);
  // console.log(limitedResearch);

  // ดึงข้อมูลงานวิจัย
  useEffect(() => {
    getAllResearch()
      .then((data) => setResearchList(data))
      .catch((error) => toast.error(`${error.message}`));
  }, []);

  // ดึงข้อมูลข่าวสาร
  useEffect(() => {
    getAllNews()
      .then((data) => setNewsList(data))
      .catch((error) => toast.error(`${error.message}`));
  }, []);

  const homeLinks = [
    {
      title: "ความรู้ทั่วไปและข่าวสารเกี่ยวกับโรคซึมเศร้า",
      path: "/news",
    },
    {
      title: "บทความงานวิจัยเกี่ยวกับโรคซึมเศร้า",
      path: "/research",
    },
  ];

  return (
    <div className="bg-sea-blue w-full lg:h-[350px] text-white lg:py-[35px]">
      {/* container */}
      <div className="grid w-[1280px] mx-auto lg:grid-cols-4 gap-8">
        <div>
          <div className="text-[28px] font-semibold">
            EMO<span className="text-[#285353]">SENSE</span>
          </div>
          <p>
            ระบบวิเคราะห์แนวโน้มโรคซึมเศร้าจากข้อความด้วย AI
            ช่วยประเมินความเสี่ยง
            <br />
            จากโพสต์หรือข้อความสะท้อนอารมณ์
            <br />
            เพื่อสนับสนุนสุขภาพจิตของคุณและคนใกล้ตัว
          </p>
        </div>

        <div>
          <h2 className="text-[24px] border-b-2 pb-2 mb-2">หน้าหลัก</h2>
          <ul className="space-y-2">
            {homeLinks.map((link, ind) => (
              <li key={ind}>
                <Link to={link.path} className="truncate">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[24px] border-b-2 pb-2 mb-2">
            ความรู้ทั่วไป / ข่าวสาร
          </h2>
          <ul className="space-y-2">
            {limitedNews.map((link, ind) => (
              <li key={ind}>
                <Link to={`/news/${link.news_id}`}>
                  <p className="truncate">{link.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[24px] border-b-2 pb-2 mb-2">บทความงานวิจัย</h2>
          <ul className="space-y-2">
            {limitedResearch.map((link, ind) => (
              <li key={ind}>
                <Link to={`/research/${link.research_id}`}>
                  <p className="truncate">{link.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[90%] border-t-2 mx-auto mt-[70px] py-[20px]">
        <p className="text-lg text-center">
          All rights reserved by Ratchatapaibool Amkhuanyuen @2024
        </p>
      </div>
    </div>
  );
}

export default Footer;
