import React, { useState, useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import knowledgeData from "../../utils/json/mock_data";
import { FaArrowRightLong } from "react-icons/fa6";
import Card from "../../components/user/Card";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";
import { getAllNews, getAllResearch } from "../../utils/func/adminService";

function Main() {
  const [newsList, setNewsList] = useState([]);
  const [researchList, setResearchList] = useState([]);

  const limitedNews = newsList.slice(0, 4);
  const limitedResearch = researchList.slice(0, 4);

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

  return (
    <div>
      <Navbar />
      {/* Main Container */}
      <div className="h-[75vh] w-full flex flex-col gap-4 items-center justify-center">
        <p className="text-center text-sea-blue lg:text-[30px] font-semibold">
          กรอกข้อความที่แสดงถึงความรู้สึกหรือความคิดที่คุณหรือคนใกล้ตัวของคุณอาจกำลังเผชิญอยู่
          <br />
          เพื่อวิเคราะห์แนวโน้มการเป็นโรคซึมเศร้า
        </p>
        <p className="text-center text-grey">
          เว็บไซต์นี้ออกแบบมาเพื่อช่วยให้ผู้ใช้สามารถตรวจสอบแนวโน้มการเป็นโรคซึมเศร้าจากข้อความที่กรอกเข้าไป
          <br />
          โดยระบบจะวิเคราะห์ข้อความที่ผู้ใช้หรือคนใกล้ตัวโพสต์บนโซเชียลมีเดีย
          หรือข้อความที่สะท้อนถึงความรู้สึกหรืออารมณ์ต่างๆ
          <br />
          เพื่อนำมาประเมินความเสี่ยงของการเป็นโรคซึมเศร้า
          ด้วยเทคโนโลยีการวิเคราะห์ข้อความอัจฉริยะที่ใช้ปัญญาประดิษฐ์ (AI)
          ในการประมวลผลและแสดงผลลัพธ์
        </p>
        <div className="flex h-[60px] items-center justify-between pl-[20px] pr-[3px] border-[2px] border-sea-blue rounded-full mt-[10px] lg:w-[620px]">
          <input type="text" className="outline-none w-[80%] text-grey" />
          <button className="bg-sea-blue text-white h-[50px] rounded-full px-[15px]">
            เริ่มวิเคราะห์
          </button>
        </div>
      </div>
      {/* ข้อมูล ข่าวสาร */}
      <div className="bg-sea-blue w-full lg:h-[600px] text-white lg:py-[35px]">
        <div className="w-[1280px] mx-auto">
          <h1 className="text-[26px] text-center font-medium">
            ความรู้ทั่วไปและข่าวสารเกี่ยวกับโรคซึมเศร้า
          </h1>
          <div className="w-full flex items-center justify-end border-b-[2px] lg:mt-[-10px] lg:pb-[5px]">
            <Link
              to={"/news"}
              className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white hover:text-sea-blue"
            >
              <p>ดูความรู้และข่าวสารทั้งหมด</p> <FaArrowRightLong />
            </Link>
          </div>
          {/* card container */}
          <div className="grid grid-cols-4 mt-[20px] gap-5">
            {limitedNews.map((post) => (
              <Card
                key={post.news_id}
                data={post}
                type="news"
                id={post.news_id}
              />
            ))}
          </div>
        </div>
      </div>
      {/* งานวิจัย */}
      <div className="bg-white w-full lg:h-[600px] text-sea-blue lg:py-[35px]">
        <div className="w-[1280px] mx-auto">
          <h1 className="text-[26px] text-center font-medium">
            บทความงานวิจัยเกี่ยวกับโรคซึมเศร้า
          </h1>
          <div className="w-full flex items-center justify-end border-b-[2px] border-sea-blue lg:mt-[-10px] lg:pb-[5px]">
            <Link
              to={"/research"}
              className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-sea-blue hover:text-white"
            >
              <p>ดูบทความงานวิจัยทั้งหมด</p> <FaArrowRightLong />
            </Link>
          </div>
          {/* card container */}
          <div className="grid grid-cols-4 mt-[20px] gap-5">
            {limitedResearch.map((post) => (
              <Card
                key={post.research_id}
                data={post}
                type="research"
                id={post.research_id}
              />
            ))}
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default Main;
