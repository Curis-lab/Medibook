import React, { useState, useContext } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useQuery } from "@tanstack/react-query";

import { authContext } from "../../../context/AuthContext";
import MyBookings from "../../../context/Dashboard/user-account/MyBookings";
import Profile from "../../../context/Dashboard/user-account/Profile";

import Loading from "../../Loader/Loading";
import Error from "../../Error/Error";
import { getCurrentUserProfile } from "../../../apis/patient";
import useAccountDeletionModal from "../../../hooks/Modals/useAccountDeletionModal";
import LogoutBtn from "../../atoms/Button/LogoutBtn/LogoutBtn";
import AccountDeletionBtn from "../../atoms/Button/AccountDeletionBtn/AccountDeletionBtn";
import PatientInfoTemplate from "../../templates/PatientInfo/PatientInfo";

function MyAccount() {
  const { dispatch, user } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const accountDeleteModal = useAccountDeletionModal();
  const {
    data: userData,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["profile", user._id],
    queryFn: getCurrentUserProfile,
  });
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="max-w-[1170px] px-5 max-auto lg:mt-[50px] container">
      {isLoading && <Loading />}
      {error && <Error errMessage={error} />}
      {isSuccess && (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <PatientInfoTemplate {...userData.data}/>
            <div className="mt-[50px] md:mt-[100px]">
              <LogoutBtn handleLogout={handleLogout}/>
              <AccountDeletionBtn handleDeletion={()=>accountDeleteModal.onOpen()}/>
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
