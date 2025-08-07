import React from 'react'
import { MdOutlineStarPurple500 } from "react-icons/md";

function DoctorInfo({name, totalRating, bio}) {
    return (
      <div>
        <span className="bg-[#ccf0f3] text-black py-1 px-4 lg:py-2 lg:px-6 rounded-lg text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
          surgeon
        </span>
        <h3 className="text-[22px] leading-9 font-bold text-primary mt-3">
          {name}
        </h3>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-primary text-[14px] leading-5 lg:[16px] lg:leading-6 font-semibold">
            <MdOutlineStarPurple500 />
            {totalRating}
          </span>
          <span className=" text-black text-[14px] leading-5 lg:[16px] lg:leading-6 font-semibold">
            (233)
          </span>
        </div>
        <p className=" font-[15px] lg:max-w-[390px] leading-6">{bio}</p>
      </div>
    )
  }
  

export default DoctorInfo
