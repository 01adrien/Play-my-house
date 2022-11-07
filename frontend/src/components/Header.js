import React from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import bannerPicture from "../assets/home_banner1.jpg";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";

export default function Header() {
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
            <Link to="/login">
              <p className="hover:text-slate-500 cursor-pointer">
                SE CONNECTER<span className="ml-2 mr-2">|</span>S'ENREGISTRER
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
