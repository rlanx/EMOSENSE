import React from "react";
import { LuUserPen, LuCalendar } from "react-icons/lu";
import { Link } from "react-router-dom";

function Card({ data }) {
  return (
    <Link to={`/knowledge/ex`} className="rounded-xl overflow-hidden shadow-md">
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
          <p className="font-semibold truncate-2-lines">{data.title}</p>
          <p className="text-light-grey truncate-3-lines">{data.desc}</p>
        </div>
        {/* author & date */}
        <div className="flex text-light-grey justify-between">
          {/* author */}
          <div className="flex items-center gap-1 w-[50%]">
            <LuUserPen size={20} className="mr-1" />
            <p className="truncate basis-3/4">{data.author}</p>
          </div>
          {/* date */}
          <div className="flex items-center gap-2">
            <LuCalendar size={20} />
            <p>{data.date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
