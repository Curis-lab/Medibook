import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Router from "../routes/Router";
import Modal from "../components/atoms/Modal/Modal";
import AccountDeletionModal from "../components/atoms/Modal/AccountDeletionModal";
// import { authContext } from "../context/AuthContext";

function Layout() {
  // const { dispatch } = useContext(authContext);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div>
      <AccountDeletionModal />
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
      {/* this is for chatbox */}
      {/* <div className="sticky bottom-0 right-0 bg-blue-600 w-[75px] h-[75px] rounded-full"></div> */}
    </div>
  );
}

export default Layout;
