import React, { useState } from 'react';
import useMenuItems from '../../hooks/useMenuItems';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import Profile from '../icons/Profile';
import { RxCrossCircled } from 'react-icons/rx';
import { BiLogIn } from 'react-icons/bi';
import { AnimatePresence, motion, useCycle } from 'framer-motion';

export default function NavMobile({ profile, open }) {
  const { menuItems, isOpen, setIsOpen, loading } = useMenuItems();
  const [navBarClose, setNavBarClose] = useState(false);
  function displayArrow(item) {
    return isOpen[item] ? (
      <MdKeyboardArrowDown className="text-white bg-main_color w-full h-full" />
    ) : (
      <MdKeyboardArrowRight className="w-full h-full" />
    );
  }

  function handleCloseNavbar() {
    setNavBarClose(true);
    open(false);
    Object.keys(isOpen).forEach((item) => {
      setIsOpen((prev) => ({ ...prev, [item]: false }));
    });
  }

  function handleSelectItem(item) {
    setIsOpen((prev) => ({ ...prev, [item]: !isOpen[item] }));
  }

  return (
    <div
      className={`fixed shadow-2xl top-0 bg-slate-200 h-[100vh] ${
        navBarClose && ''
      } ${open ? 'z-10  ' : 'hidden'} `}
    >
      <div className="bg-white">
        <div className="w-full bg-white h-[25%] border-8 border-border_color flex justify-center items-center">
          <Link to={'/'}>
            <img
              className={`h-44 w-52 rounded-full ${navBarClose && 'hidden'}`}
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <ul>
          <li>
            <div
              className={`flex justify-between  items-center border-b-[1px] border-r-[1px] cursor-pointer  pl-2 h-10 border-border_color ${
                navBarClose && 'hidden'
              }`}
            >
              <Link to={'/instrument-all'}>
                <span className="w-[80%]">INSTRUMENTS</span>
              </Link>
              <span className="w-10 h-10 flex justify-center items-center">
                {
                  <RxCrossCircled
                    onClick={handleCloseNavbar}
                    className="bg-red-600 text-white cursor-pointer rounded-full text-axl"
                  />
                }
              </span>
            </div>
          </li>
          {menuItems &&
            Object.keys(menuItems).map((item, i) => {
              return (
                <div key={i}>
                  <li key={i}>
                    <div
                      className={`flex justify-between  items-center border-b-[1px] cursor-pointer hover:bg-slate-100 pl-2 h-10 border-border_color ${
                        isOpen[item] && 'bg-slate-100'
                      }`}
                    >
                      <Link
                        key={i}
                        onClick={handleCloseNavbar}
                        className="w-[80%] h-10 flex items-center"
                        to={`/instrument-family/${item}`}
                      >
                        <span
                          className={`animate-[appearAfter_0.4s_ease-in-out] ${
                            navBarClose && 'hidden'
                          }`}
                        >
                          {item.toUpperCase()}
                        </span>
                      </Link>
                      <span
                        className="cursor-pointer text-xl border-x-[1px] border-border_color w-10 h-10"
                        onClick={() => handleSelectItem(item)}
                      >
                        {displayArrow(item)}
                      </span>
                    </div>
                    <ul>
                      {menuItems[item].map((it, i) => {
                        return (
                          <Link
                            key={it}
                            onClick={handleCloseNavbar}
                            to={`/instrument-type/${it}`}
                          >
                            <li
                              key={i}
                              className={`w-[100%] text-slate-500 border-border_color hover:bg-slate-100 cursor-pointer flex items-center h-8 pl-4 border-b-[1px] ${
                                !isOpen[item] && 'hidden'
                              }`}
                            >
                              <span className="w-[100%] text-sm">{it}</span>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </li>
                </div>
              );
            })}
          <Link to={'/login'} onClick={handleCloseNavbar}>
            <li
              className={`flex  justify-between items-center border-r-[1px] border-b-[1px] cursor-pointer hover:bg-slate-100 pl-2 h-10 border-border_color ${
                navBarClose && 'hidden'
              }`}
            >
              <div className="">
                {profile ? 'SE DECONNECTER' : 'SE CONNECTER'}
              </div>
              <div className=" w-10 h-10 flex justify-center items-center text-main_color">
                <BiLogIn className="text-2xl" />
              </div>
            </li>
          </Link>
          {profile && (
            <Link to={'/user'} onClick={handleCloseNavbar}>
              <li
                className={`flex justify-between  items-center border-r-[1px] border-b-[1px] cursor-pointer hover:bg-slate-100 pl-2 h-10 border-border_color ${
                  navBarClose && 'hidden'
                }`}
              >
                <div>MON COMPTE</div>
                <div className=" w-10 h-10 flex justify-center items-center text-main_color">
                  <Profile />
                </div>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
