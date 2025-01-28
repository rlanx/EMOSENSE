import React from "react";
import footerLinks from "../../utils/footer";

function Footer() {
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
            ช่วยประเมินความเสี่ยงจากโพสต์หรือข้อความสะท้อนอารมณ์
            เพื่อสนับสนุนสุขภาพจิตของคุณและคนใกล้ตัว
          </p>
        </div>
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h2 className="text-[24px] border-b-2 pb-2 mb-2">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.links.map((link, ind) => (
                <li key={ind}>
                  <button>
                    <span className="truncate">{link}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
