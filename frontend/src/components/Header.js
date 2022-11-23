import React from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import DropdownMenu from "./nav/DropdownMenu";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { user } from "../store/user";
import { useRecoilState } from "recoil";

export default function Header() {
  const [profile, setProfile] = useRecoilState(user);
  return (
    <div className="h-46">
      <div className="w-full h-9 bg-main_color"></div>
      <div className="w-full h-36 flex justify-around items-center border-b-2 border-slate-200">
        <Link to="/">
          <img className="h-20 w-30 rounded-full" src={logo} alt="logo" />
        </Link>
        <SearchBar />
        <Link to="/">
          <img className="h-20 w-30 rounded-full" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="w-full h-10 flex justify-center border-b-2 items-center border-slate-200">
        <div className="w-[80%] flex justify-between items-center">
          <DropdownMenu />
          <div>
            {profile?.name ? (
              <div className="flex">
                <Link to="/">
                  {" "}
                  <p
                    onClick={() => {
                      logout();
                      setProfile({ default: "user" });
                    }}
                    className="hover:text-slate-500 cursor-pointer mr-5"
                    data-cy="logout"
                  >
                    SE DECONNECTER
                  </p>
                </Link>
                <Link to="/user">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <p className="hover:text-slate-500 cursor-pointer">
                  SE CONNECTER<span className="ml-2 mr-2">|</span>S'ENREGISTRER
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
