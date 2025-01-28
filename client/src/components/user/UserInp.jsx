import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function TextInp({ Icon, type, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  // สลับสถานะแสดง/ซ่อนรหัสผ่าน
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-12 flex items-center bg-[#f5f5f5] px-4 rounded-lg focus-within:ring-2 focus-within:ring-sea-blue ">
      {Icon && <Icon className="text-[22px] mr-3 opacity-40" />}
      <input
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-[#f5f5f5]"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="ml-2 opacity-40 focus:outline-none"
        >
          {showPassword ? (
            <LuEye className="text-[22px]" /> // ไอคอนซ่อนรหัสผ่าน
          ) : (
            <LuEyeClosed className="text-[22px]" /> // ไอคอนแสดงรหัสผ่าน
          )}
        </button>
      )}
    </div>
  );
}

export default TextInp;
