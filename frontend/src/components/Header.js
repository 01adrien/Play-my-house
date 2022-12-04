import React from 'react';
import SearchBar from './SearchBar';
import logo from '../assets/logo.png';
import DropdownMenu from './nav/DropdownMenu';
import { Link, Navigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { user } from '../store/user';
import { useRecoilState } from 'recoil';
import Profile from './icons/Profile';

export default function Header() {
  const [profile, setProfile] = useRecoilState(user);
  return (
    <div className="h-46 mb-6">
      <div className="w-full h-9 bg-main_color"></div>
      <div className="w-full h-36 flex justify-around items-center border-slate-200">
        <Link to="/">
          <img className="h-20 w-30 rounded-full" src={logo} alt="logo" />
        </Link>
        <SearchBar />
        <Link to="/">
          <img className="h-20 w-30 rounded-full" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="w-full h-12 flex justify-center items-center shadow-inner border-main_color bg-slate-100">
        <div
          onClick={() => <Navigate to={'/instrument-all'} replace />}
          className="w-[80%] h-12 flex justify-between items-center"
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
                    className="hover:text-main_color hover:scale-105 cursor-pointer mr-5"
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
