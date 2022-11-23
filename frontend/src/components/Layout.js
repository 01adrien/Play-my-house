import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { user } from "../store/user";
import { useSetRecoilState } from "recoil";
import { getProfile } from "../api/user";

export default function Layout({ children }) {
  const setProfile = useSetRecoilState(user);
  useEffect(() => {
    getProfile().then((u) => setProfile(u));
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
      {/* <Footer /> */}
      <Toaster />
    </div>
  );
}
