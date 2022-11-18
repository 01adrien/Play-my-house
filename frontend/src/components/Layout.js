import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, user, setUser }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header user={user} setUser={setUser} />
      {children}
      <Footer />
    </div>
  );
}
