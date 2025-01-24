import React from "react";
import Navbar from "../../components/user/Navbar";
import knowledgeData from "../../utils/mock_data";
import { FaArrowRightLong } from "react-icons/fa6";
import Card from "../../components/user/Card";

function Main() {
  const limitedPost = knowledgeData.slice(0, 4);
  return (
    <div>
      <Navbar />
      {/* Main Container */}
      <div className="h-[75vh] w-full flex flex-col gap-4 items-center justify-center">
        <p className="text-center text-grey lg:text-[30px] font-semibold">
          กรอกข้อความที่แสดงถึงความรู้สึกหรือความคิดที่คุณหรือคนใกล้ตัวของคุณอาจกำลังเผชิญอยู่
          <br />
          เพื่อวิเคราะห์แนวโน้มการเป็นโรคซึมเศร้า
        </p>
        <p className="text-center text-grey ">
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
      <div className="bg-sea-blue w-full lg:h-[600px] text-white lg:px-[300px] lg:py-[35px]">
        <h1 className="text-[26px] text-center">
          แหล่งความรู้และข่าวสารเกี่ยวกับโรคซึมเศร้า
        </h1>
        <div className="w-full flex items-center justify-end border-b-[2px] lg:mt-[-10px] lg:pb-[5px]">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white hover:text-sea-blue">
            <p>ดูความรู้และข่าวสารทั้งหมด</p> <FaArrowRightLong />
          </div>
        </div>
        {/* card container */}
        <div className="grid grid-cols-4 mt-[20px] gap-5">
          {limitedPost.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              desc={post.description}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      </div>
      {/* งานวิจัย */}
      <div></div>
    </div>
  );
}

export default Main;
