import React from 'react'
import { FaStar} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs';
function DoctorCard({name, specialization, totalRating, photo, totalPatients, hospital}) {
  return (
    <div className="p-3 lg:p-5">
        <div>
            <img src={photo} alt="" className="w-full" />
        </div>
        <h2 className="text[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-black font-[700] mt-3 lg:mt-5">{name}</h2>
        <div className="mt-2 lg:mt-4 flex items-center justify-between">
            <span className="bg-[#ccf0f3] text-blue-400 py-3.5 px-2.5 lg:py-2 lg:px-[20px] text-[18px] rounded-full">{specialization}</span> 
        <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-black">
            ({totalRating})
        </span>
        </div>
        <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
            <div>
                <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-black">+{totalPatients} patients</h3>
                <p className="text-[14px] leading-6">At {hospital}</p>
            </div>
            <Link
                  to="/doctors/1"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
        </div>
    </div>
  )
}

export default DoctorCard
