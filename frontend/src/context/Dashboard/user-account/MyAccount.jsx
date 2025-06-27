import React, { useState } from "react";
import { useContext } from "react";
import { authContext } from "../../AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useFetchData from "../../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Loading from "../../../components/Loader/Loading";
import Error from "../../../components/Error/Error";
function MyAccount() {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/user/profile/me`);
  console.log(userData);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="max-w-[1170px] px-5 max-auto">
      {loading && <Loading />}
      {error && <Error errMessage={error}/>}
      {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primary">
                <img
                  src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-primary font-bold">
                Muhia
              </h3>
              <p className="text-black text-[15px] leading-6 font-medium">
                example@gmail.com
              </p>
              <p className="text-black text-[15px] leading-6 font-medium">
                Blood Type:{" "}
                <span className="ml-2 text-primary text-[22px] leading-8">
                  A+
                </span>
              </p>
            </div>
            <div className="mt-[50px] md:mt-[100px]">
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
          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings" && "bg-primary text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-black font-semibold text-[16px] leading-6 border border-solid border-primary`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab("profile")}
                className={`${
                  tab === "profile" && "bg-primary text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-black font-semibold text-[16px] leading-6 border border-solid border-primary`}
              >
                Profile Settings
              </button>
            </div>
            {tab === "bookings" ? <MyBookings /> : <Profile />}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccount;
