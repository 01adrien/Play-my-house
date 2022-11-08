import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";

export default function User() {
  const [activeHeading, setActiveHeading] = useState("Details du compte");
  const location = useLocation();
  const headings = {
    "Reservation a venir": "mes rervations a venir",
    "Reservation passes": "mes rervations passees",
    "Details du compte": <UserProfile userInfos={location.state.user} />,
    Deconnexion: <Navigate to="/" />,
  };
  if (!location.state) return <Navigate to="/login" />;
  return (
    <Layout>
      <div className="w-full h-[80vh] flex justify-center">
        <div className=" w-[85%] h-full">
          <div className="h-24 flex items-center">
            <p className="text-[1.8em] font-bold">Mon compte</p>
          </div>
          <div className="flex justify-around w-[100%] h-[70%]">
            <div className="flex flex-col border-r-2 border-border_color h-[100%] w-[25%]">
              <div className="h-14 w-[80%] flex justify-start items-center border-b-2">
                <p className="text-[1.2em] pl-5"> MON COMPTE</p>
              </div>
              {Object.keys(headings).map((head) => {
                return (
                  <div
                    key={head}
                    onClick={() => setActiveHeading(head)}
                    className={`h-10 w-[80%] flex hover:bg-slate-200 ${
                      activeHeading === head && "bg-slate-200"
                    } cursor-pointer justify-start items-center`}
                  >
                    <p className="pl-5">{head}</p>
                  </div>
                );
              })}
            </div>
            <div className=" w-[100%]">
              <div>{headings[activeHeading]}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
