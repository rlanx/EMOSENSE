import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ใช้ theme snow

export default function ContentForm({
  type,
  pageName,
  onSubmit,
  initialData = {},
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [desc, setDesc] = useState(initialData.desc || ""); // คำอธิบาย
  const [author, setAuthor] = useState(initialData.author || ""); // ผู้เขียน
  const [content, setContent] = useState(initialData.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, desc, author, content, type });
  };

  const modules = {
    toolbar: [
      [{ header: [2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"], // เพิ่มปุ่มแทรกรูปภาพ
    ],
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-[1280px] flex flex-col items-center gap-5"
    >
      {/* page title */}
      {pageName && (
        <p className="w-fit px-3 text-center text-2xl font-semibold border-b-[3px] border-primary pb-1">
          {pageName}
        </p>
      )}

      {/* input fields */}
      <div className="w-[900px] space-y-4">
        {/* title */}
        <div className="space-y-2">
          <label>
            {type === "news" ? "หัวข้อความรู้ / ข่าวสาร" : "หัวข้องานวิจัย"}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#f5f5f5] w-full h-12 px-4 rounded-lg focus-within:ring-2 focus-within:ring-sea-blue outline-none "
          />
        </div>

        {/* description */}
        <div className="space-y-2">
          <label>คำอธิบาย (Description)</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="bg-[#f5f5f5] w-full h-20 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-sea-blue outline-none"
          />
        </div>

        {/* author */}
        <div className="space-y-2">
          <label>ผู้เขียน (Author)</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-[#f5f5f5] w-full h-12 px-4 rounded-lg focus-within:ring-2 focus-within:ring-sea-blue outline-none"
          />
        </div>

        {/* details */}
        <div className="space-y-2 flex-grow flex flex-col">
          <label>
            {type === "news" ? "เนื้อหาความรู้ / ข่าวสาร" : "เนื้อหางานวิจัย"}
          </label>
          <div className="flex-grow">
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              className="h-80 bg-[#f5f5f5] rounded-lg focus-within:ring-2 focus-within:ring-primary custom-quill "
              style={{
                minHeight: "400px",
                maxHeight: "500px",
                overflow: "hidden",
              }}
            />
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary flex items-center gap-2 h-12 px-5 rounded-lg text-white"
          >
            <Save size={20} />
            {initialData.title ? "อัปเดต" : "บันทึก"}
          </button>
        </div>
      </div>
    </form>
  );
}
