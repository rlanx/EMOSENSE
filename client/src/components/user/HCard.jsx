import React from "react";
import { UserPen, Calendar } from "lucide-react";

function HCard({ title, desc, author, date }) {
  return (
    <div className="w-full min-h-[160px] flex items-center justify-between py-8 border-b-[1px] ">
      {/* info container */}
      <div className="w-[70%] text-light-grey flex flex-col gap-4">
        {/* Author info */}
        <div className="flex items-center gap-2">
          <UserPen size={22} />
          <p>{author}</p>
        </div>
        {/* title & desc */}
        <div className="space-y-1">
          <p className="text-grey text-xl font-bold truncate-3-lines">
            {title}
          </p>
          <p className="truncate-3-lines">{desc}</p>
        </div>
        {/* date */}
        <div className="flex items-center gap-2">
          <Calendar size={22} />
          <p>{date}</p>
        </div>
      </div>
      {/* image container */}
      <div className="lg:w-[180px] lg:h-[140px] overflow-hidden rounded-lg ">
        <img
          src="/src/assets/default-image.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default HCard;
