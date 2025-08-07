import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../context/AuthContext";
import useAccountDeletionModal from "../../../hooks/Modals/useAccountDeletionModal";
import LogoutBtn from "../../../components/atoms/Button/LogoutBtn/LogoutBtn";
import AccountDeletionBtn from "../../../components/atoms/Button/AccountDeletionBtn/AccountDeletionBtn";
import { 
  BiMenu, 
  BiHomeAlt,           // For Overview tab
  BiCalendar,          // For Appointments tab  
  BiUser,              // For Profile tab
  BiTime               // For Time Slot Management tab
} from "react-icons/bi";

function TabBtn({ fn, tab, label, identity, icon: Icon }) {
  const isActive = tab === identity;
  const buttonClasses = `
    w-full 
    mt-0 
    rounded-full 
    flex 
    items-center 
    gap-2 
    py-2 
    px-5
    ${isActive ? "bg-[#1e1b1b86] text-[#fff]" : "bg-transparent text-black"}
  `;

  return (
    <button onClick={fn} className={buttonClasses}>
      {Icon && <Icon className="text-lg" />}
      {label}
    </button>
  );
}

function Tabs({ tab, setTab }) {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const accountDeletionModal = useAccountDeletionModal();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  
  return (
    <div className="flex flex-col h-screen">
      <div className="hidden lg:flex flex-col p-[20px] bg-paper backdrop-blur-lg shadow-md h-max rounded-md gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: BiHomeAlt },
          { id: 'appointments', label: 'Appointments', icon: BiCalendar },
          { id: 'settings', label: 'Profile', icon: BiUser },
          { id: 'timeslot', label: 'Time Slot Management', icon: BiTime }
        ].map(({ id, label, icon }) => (
          <TabBtn
            key={id}
            fn={() => setTab(id)}
            tab={tab}
            label={label}
            identity={id}
            icon={icon}
          />
        ))}
      </div>
      <div className="mt-[100px] w-full">
        <LogoutBtn handleLogout={handleLogout} />
        <AccountDeletionBtn
          handleDeletion={() => accountDeletionModal.onOpen}
        />
      </div>
    </div>
  );
}

export default Tabs;
