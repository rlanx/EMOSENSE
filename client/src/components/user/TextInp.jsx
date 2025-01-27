import React from "react";

function TextInp({ Icon, type, placeholder }) {
  return (
    <div className="w-full h-12 flex items-center bg-[#f5f5f5] px-4 rounded-lg focus-within:ring-2 focus-within:ring-sea-blue ">
      {Icon && <Icon className="text-[22px] mr-2 opacity-40" />}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full outline-none bg-[#f5f5f5]"
      />
    </div>
  );
}

export default TextInp;
