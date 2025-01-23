import React from "react";

function Card({ title, desc, author, date }) {
  return (
    <div className="rounded-xl overflow-hidden">
      {/* image */}
      <div className="h-[250px]">
        <img
          src="/src/assets/default-image.png"
          alt=""
          className="object-cover h-full"
        />
      </div>
      <div className="h-[150px] bg-white text-grey px-5 py-3">
        <p>{title}</p>
        <p>{desc}</p>
        <p>{author}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default Card;
