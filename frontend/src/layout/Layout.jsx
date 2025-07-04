import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Router from "../routes/Router";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
