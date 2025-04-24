import React, { useState, useEffect, useRef } from "react";
import { Save, ImageUp } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ใช้ theme snow

import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function ContentForm({
  mode,
  type,
  pageName,
  onSubmit,
  initialData = {},
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [desc, setDesc] = useState(initialData?.desc || ""); // คำอธิบาย
  const [author, setAuthor] = useState(initialData?.author || ""); // ผู้เขียน
  const [content, setContent] = useState(initialData?.content || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (thumbnail) {
      const imageUrl = URL.createObjectURL(thumbnail);
      setPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl); // ล้าง URL เมื่อ thumbnail เปลี่ยน
    } else {
      setPreview(null);
    }
  }, [thumbnail]);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setTitle(initialData?.title || "");
      setDesc(initialData?.desc || "");
      setAuthor(initialData?.author || "");
      setContent(initialData?.content || "");
      if (initialData?.thumbnail) {
        setPreview(`${initialData.thumbnail}`);
      }
    }
  }, [initialData]);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setAuthor("");
    setContent("");
    setThumbnail(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const modules = {
    toolbar: [
      [{ header: [2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !desc.trim() || !content.trim()) {
      onSubmit(null, "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (!thumbnail && mode === "add") {
      onSubmit(null, "กรุณาเลือกรูปภาพ Thumbnail");
      return;
    }

    // ส่งข้อมูลไปยังฟังก์ชัน submit ของหน้าต่างๆ
    onSubmit({ title, desc, author, content, type, thumbnail });
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

        <div className="grid grid-cols-2 gap-4">
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
          {/* thumnail */}
          <div className="space-y-2">
            <label>อัปโหลดรูป Thumbnail ( ขนาดต้องไม่เกิน 5MB )</label>
            <div
              onClick={handleDivClick}
              className="bg-[#f5f5f5] w-full h-12 pl-4 pr-1 rounded-lg flex items-center justify-between text-light-grey cursor-pointer"
            >
              <p className="w-[90%] truncate">
                {thumbnail ? thumbnail.name : "ยังไม่ได้เลือกรูปภาพ"}
              </p>
              {/* ปุ่มเลือกไฟล์ (เชื่อมกับ input ที่ซ่อน) */}
              <label
                htmlFor="thumbnailInput"
                className="size-10 bg-primary text-white rounded-lg flex items-center justify-center "
              >
                <ImageUp />
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {preview && (
          <div className="space-y-2">
            <label>ตัวอย่างรูป Thumbnail</label>
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        )}

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
              className="h-80 bg-[#f5f5f5] rounded-lg focus-within:ring-2 focus-within:ring-primary custom-quill lg:pb-[50px]"
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
            {mode === "add" ? "เพิ่ม" : "แก้ไข"}
          </button>
        </div>
      </div>
    </form>
  );
}
