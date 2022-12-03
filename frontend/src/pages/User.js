import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logout } from '../api/auth';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import BaseTable from '../components/tables/BaseTable';
import UserProfile from '../components/UserProfile';
import { user } from '../store/user';
import { getAllUsers, getUserCount } from '../api/user';
import { getInstruments, getInstrumentCount } from '../api/instrument';

export default function User() {
  const [profile, setProfile] = useRecoilState(user);
  const [activeHeading, setActiveHeading] = useState('Details du compte');

  const navigate = useNavigate();
  const disconnect = () => {
    logout(user);
    setProfile({ default: 'user' });
    navigate('/');
  };
  const userHeadings = {
    'Reservation a venir': 'mes rervations a venir',
    'Reservation passes': 'mes rervations passees',
    'Details du compte': <UserProfile />,
    Messages: 'Mes messages',
    Deconnexion: '',
  };

  const ownerHeadings = {
    'Mes instruments': 'mes instruments',
    'Reservation a venir': 'mes rervations a venir',
    'Reservation passes': 'mes rervations passees',
    'Details du compte': <UserProfile />,
    Messages: 'Mes messages',
    Deconnexion: '',
  };

  const adminHeadings = {
    Utilisateurs: <BaseTable fn1={getUserCount} fn2={getAllUsers} />,
    Instruments: <BaseTable fn1={getInstrumentCount} fn2={getInstruments} />,
    Planning: 'planning',
    'Details du compte': <UserProfile />,
    Messages: 'Mes messages',
    Deconnexion: '',
  };

  console.log('jjijij');

  let headings;
  if (profile?.role === 'user') headings = userHeadings;
  if (profile?.role === 'owner') headings = ownerHeadings;
  if (profile?.role === 'admin') headings = adminHeadings;

  return (
    <Layout>
      <div className="w-full h-[70vh] flex justify-center">
        <div className=" w-[85%] h-full">
          <div className="h-24 flex items-center">
            <p className="text-[1.8em] font-bold">Mon compte</p>
          </div>
          <div className="flex justify-around w-[100%] h-[100%]">
            <div className="flex flex-col border-r-2 border-border_color w-52">
              <div className="h-14 w-[80%] flex justify-start items-center border-b-2">
                <p className="text-[1.2em] pl-5"> MON COMPTE</p>
              </div>
              {Object.keys(headings).map((head) => {
                return (
                  <div
                    key={head}
                    onClick={() => {
                      head === 'Deconnexion'
                        ? disconnect()
                        : setActiveHeading(head);
                    }}
                    className={`h-10 w-[80%] flex hover:text-main_color ${
                      activeHeading === head && 'bg-slate-200 text-main_color'
                    } cursor-pointer justify-start items-center`}
                  >
                    <p className="pl-5">{head}</p>
                  </div>
                );
              })}
            </div>
            <div className=" w-[80%] flex justify-center">
              <div className="w-[90%]">{headings[activeHeading]}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
