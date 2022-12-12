import React, { useState } from 'react';
import SearchBar from './SearchBar';
import logo from '../assets/logo.png';
import DropdownMenu from './nav/DropdownMenu';
import { Link, Navigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { user } from '../store/user';
import { useRecoilState } from 'recoil';
import Profile from './icons/Profile';
import NavMobile from './nav/NavMobile';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Header() {
  const [profile, setProfile] = useRecoilState(user);
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="h-46">
      <div className="w-full h-9 bg-main_color shadow-md"></div>
      <div className="w-full h-36 flex justify-around items-center border-slate-200">
        <Link to="/">
          <img
            className="h-20 w-30 rounded-full xs:hidden 2xs:hidden 3xs:hidden"
            src={logo}
            alt="logo"
          />
        </Link>
        <SearchBar />
        <Link to="/">
          <img
            className="h-20 w-30 rounded-full xs:hidden 2xs:hidden 3xs:hidden"
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
      <div
        className={`w-full h-12 flex justify-center items-center shadow-inner bg-slate-100`}
      >
        <div
          onClick={() => <Navigate to={'/instrument-all'} replace />}
          className="w-[80%] h-12 lg:flex justify-between items-center md:hidden sm:hidden xs:hidden 2xs:hidden 3xs:hidden"
        >
          <DropdownMenu />
          <div>
            {profile?.name ? (
              <div className="flex">
                <Link to="/">
                  {' '}
                  <p
                    onClick={() => {
                      logout();
                      setProfile({ default: 'user' });
                    }}
                    className="hover:text-main_color text-sm  cursor-pointer mr-5"
                    data-cy="logout"
                  >
                    SE DECONNECTER
                  </p>
                </Link>
                <Link to="/user">
                  <Profile />
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <p className="hover:text-main_color text-sm  cursor-pointer">
                  SE CONNECTER<span className="ml-2 mr-2">|</span>
                  S'ENREGISTRER
                </p>
              </Link>
            )}
          </div>
        </div>
        <div className="w-full pl-1  lg:hidden xl:hidden">
          {
            <RxHamburgerMenu
              onClick={() => setOpenNav(!openNav)}
              className={`text-main_color h-10 w-10 sticky ${
                openNav && 'hidden'
              } cursor-pointer`}
            />
          }
        </div>
      </div>
      {openNav && <NavMobile profile={profile} open={setOpenNav} />}
    </div>
  );
}
