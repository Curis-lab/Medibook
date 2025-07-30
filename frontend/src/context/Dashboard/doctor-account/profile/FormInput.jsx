import React from "react";

function FormInput({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer ${className}`}
      {...props}
    />
  );
}
export default FormInput;
