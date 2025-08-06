import React from "react";

function LogoutBtn({ handleLogout }) {
  return (
    <button
      onClick={handleLogout}
      className="w-full bg-[#181a1e] p-3 text-[16px] leading-7 rounded-md text-white"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
