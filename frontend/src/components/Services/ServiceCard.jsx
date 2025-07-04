import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
function ServiceCard({ item, idx }) {
  const { name, description, bgColor, textColor } = item;
  return (
    <div className="py-[30px] px-3 lg:px-5">
      <h2 className="text-[26px] leading-9 text-black font-[700]">{name}</h2>
      <p className="text-[16px] leading-7 font-[400] text-black mt-4">
        {description}
      </p>
      <div className="flex items-center justify-between mt-[30px]">
        <Link
          to="/doctors"
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181a1e] flex items-center justify-center group hover:bg-primary hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-6" />
        </Link>
        <span
          className="w-[44px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600]"
          style={{
            background: `${bgColor}`,
            color: `${textColor}`,
            borderRadius: "6px 0 0 6px",
          }}
        >
          {idx + 1}
        </span>
      </div>
    </div>
  );
}

export default ServiceCard;
