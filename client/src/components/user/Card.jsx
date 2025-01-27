import React from "react";
import { FaUserPen, FaRegCalendar } from "react-icons/fa6";

function Card({ title, desc, author, date }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md cursor-pointer">
      {/* image */}
      <div className="h-[250px]">
        <img
          src="/src/assets/default-image.png"
          alt=""
          className="object-cover h-full"
        />
      </div>
      <div className="flex flex-col justify-between h-[170px] bg-white text-grey px-5 py-3">
        {/* title & desc */}
        <div>
          <p className="font-semibold truncate-2-lines">{title}</p>
          <p className="text-light-grey truncate-3-lines">{desc}</p>
        </div>
        {/* author & date */}
        <div className="flex text-light-grey justify-between">
          {/* author */}
          <div className="flex items-center gap-1 w-[50%]">
            <FaUserPen size={18} className="basis-1/4" />
            <p className="truncate basis-3/4">{author}</p>
          </div>
          {/* date */}
          <div className="flex items-center gap-2">
            <FaRegCalendar size={18} />
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
