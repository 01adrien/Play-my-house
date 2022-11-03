import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import CurrentUserContextprovider from "../context/CurrentUserContext";

export default function Layout({ children }) {
  return (
    <CurrentUserContextprovider>
      <div className="flex flex-col h-screen justify-between">
        <Header />
        {children}
        <Footer />
      </div>
    </CurrentUserContextprovider>
  );
}
