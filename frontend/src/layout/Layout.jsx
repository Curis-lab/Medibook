import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Router from "../routes/Router";
import Modal from "../components/atoms/Modal/Modal";
import AccountDeletionModal from "../components/atoms/Modal/AccountDeletionModal";

function Layout() {
  return (
    <>
      <AccountDeletionModal />
      <Header />
      <main className="">
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
