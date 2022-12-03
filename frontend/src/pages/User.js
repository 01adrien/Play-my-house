import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import BaseTable from '../components/tables/BaseTable';
import UserProfile from '../components/UserProfile';
import { user } from '../store/user';
import { getUserAdmin, getUserCount } from '../api/user';
import { getInstrumentAdmin, getInstrumentCount } from '../api/instrument';
import {
  getActiveUserReservation,
  getActiveCountByUser,
  getInactiveCountByUser,
  getInactiveUserReservation,
} from '../api/reservation';
import { listToDelete } from '../store/user';
import { useSetRecoilState, useRecoilState } from 'recoil';

export default function User() {
  const setItemsToDelete = useSetRecoilState(listToDelete);
  const [profile, setProfile] = useRecoilState(user);
  const [activeHeading, setActiveHeading] = useState('Details du compte');

  const navigate = useNavigate();
  const disconnect = () => {
    logout(user);
    setProfile({ default: 'user' });
    navigate('/');
  };

  const handleSelectHeading = (h) => {
    h === 'Deconnexion' ? disconnect() : setActiveHeading(h);
    setItemsToDelete([]);
  };

  const userHeadings = {
    'Reservation a venir': (
      <BaseTable
        fn1={getActiveCountByUser}
        fn2={getActiveUserReservation}
        id={profile.id}
        view="USER_RESERVATION"
      />
    ),
    'Reservation passes': (
      <BaseTable
        fn1={getInactiveCountByUser}
        fn2={getInactiveUserReservation}
        id={profile.id}
        view="USER_RESERVATION"
      />
    ),
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
    Utilisateurs: (
      <BaseTable fn1={getUserCount} fn2={getUserAdmin} view="ADMIN_USERS" />
    ),
    Instruments: (
      <BaseTable
        fn1={getInstrumentCount}
        fn2={getInstrumentAdmin}
        view="ADMIN_INSTRUMENTS"
      />
    ),
    Planning: 'planning',
    'Details du compte': <UserProfile />,
    Messages: 'Mes messages',
    Deconnexion: '',
  };

  let headings;
  if (profile?.role === 'user') headings = userHeadings;
  if (profile?.role === 'owner') headings = ownerHeadings;
  if (profile?.role === 'admin') headings = adminHeadings;

  return (
    <Layout>
      <div className="w-full h-[70vh] flex justify-center">
        <div className=" w-[85%] h-full">
          <div className="flex justify-around w-[100%] h-[100%] mt-14">
            <div className="flex flex-col border-r-2 border-border_color w-52">
              <div className="h-14 w-[80%] flex justify-start items-center border-b-2">
                <p className="text-[1.2em] pl-5"> MON COMPTE</p>
              </div>
              {Object.keys(headings).map((head) => {
                return (
                  <div
                    key={head}
                    onClick={() => handleSelectHeading(head)}
                    className={`h-10 w-[80%] flex hover:text-main_color ${
                      activeHeading === head && 'bg-slate-200 text-main_color'
                    } cursor-pointer justify-start items-center`}
                  >
                    <p
                      className={`pl-2 ${
                        activeHeading !== head && 'hover:scale-105'
                      }`}
                    >
                      {head}
                    </p>
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
