import React ,{useContext}from "react";
import { BiMenu } from "react-icons/bi";
import {useNavigate} from 'react-router-dom';
import { authContext} from '../../../context/AuthContext';
function Tabs({ tab, setTab }) {
  const {dispatch} = useContext(authContext)
  const navigate = useNavigate();
  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'});
    navigate('/');
  }
  return (
    <div>
      <span>
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-md items-center h-max rounded-md">
        <button
        onClick={()=>setTab('overview')}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primary"
              : "bg-transparent text-black"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
        onClick={()=>setTab('appointments')}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primary"
              : "bg-transparent text-black"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
         onClick={()=>setTab('settings')}
         className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primary"
              : "bg-transparent text-black"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>
      </div>
      <div className="mt-[100px] w-full">
              <button
                onClick={handleLogout}
                className="w-full bg-[#181a1e] p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Logout
              </button>
              <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md mt-4 text-white">
                Delete Account
              </button>
            </div>
    </div>
  );
}

export default Tabs;
