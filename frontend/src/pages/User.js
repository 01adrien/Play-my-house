import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import BaseTable from '../components/tables/BaseTable';
import InProgress from '../components/InProgress';
import UserProfile from '../components/UserProfile';
import AddInstrumentForm from '../components/form/AddInstrumentForm';
import { user } from '../store/user';
import { getUserAdmin, getUserCount } from '../api/user';
import {
  getInstrumentAdmin,
  getInstrumentCount,
  getOwnerInstrument,
  getOwnerCount,
  getCountToValidate,
  getInstrumentToValidate,
} from '../api/instrument';
import {
  getUserReservation,
  getActiveCountByUser,
  getInactiveCountByUser,
  getOwnerReservation,
  getActiveCountByOwner,
  getInactiveCountByOwner,
} from '../api/reservation';
import { listToDelete } from '../store/user';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { VscSettings } from 'react-icons/vsc';
import { RxCrossCircled } from 'react-icons/rx';
import useProfilePicture from '../hooks/useProfilePicture';

export default function User() {
  const setItemsToDelete = useSetRecoilState(listToDelete);
  const [profile, setProfile] = useRecoilState(user);
  const [activeHeading, setActiveHeading] = useState('Details du compte');
  const [openSettings, setOpenSettings] = useState(false);
  const navigate = useNavigate();
  const disconnect = () => {
    logout(user);
    setProfile({ default: 'user' });
    navigate('/');
  };

  const { avatar, avatarLoading } = useProfilePicture(profile?.id);

  const handleSelectHeading = (h) => {
    if (h === 'Deconnexion') {
      disconnect();
    } else {
      setActiveHeading(h);
      setOpenSettings(false);
    }

    setItemsToDelete([]);
  };

  const userHeadings = {
    'Reservation a venir': (
      <BaseTable
        fn1={getActiveCountByUser}
        fn2={getUserReservation}
        id={profile.id}
        view="USER_RESERVATION"
        title="Mes reservations à venir"
        resaStatus={1}
      />
    ),
    'Reservation passes': (
      <BaseTable
        fn1={getInactiveCountByUser}
        fn2={getUserReservation}
        id={profile.id}
        view="USER_RESERVATION"
        title="Mes reservations passées"
        resaStatus={0}
      />
    ),
    'Details du compte': <UserProfile />,
    Messages: <InProgress />,
    Deconnexion: '',
  };

  const ownerHeadings = {
    'Mes instruments': (
      <BaseTable
        fn1={getOwnerCount}
        fn2={getOwnerInstrument}
        id={profile.id}
        view="OWNER_INSTRUMENT"
        title="Mes instruments"
        resaStatus={null}
      />
    ),
    'Reservation a venir': (
      <BaseTable
        fn1={getActiveCountByOwner}
        fn2={getOwnerReservation}
        id={profile.id}
        view="OWNER_RESERVATION"
        title="Mes reservations à venir"
        resaStatus={1}
      />
    ),
    'Reservation passes': (
      <BaseTable
        fn1={getInactiveCountByOwner}
        fn2={getOwnerReservation}
        id={profile.id}
        view="OWNER_RESERVATION"
        title="Mes reservations passées"
        resaStatus={0}
      />
    ),
    'Ajout instrument': <AddInstrumentForm />,
    'Details du compte': <UserProfile />,
    Messages: <InProgress />,
    Deconnexion: '',
  };

  const adminHeadings = {
    Utilisateurs: (
      <BaseTable
        fn1={getUserCount}
        fn2={getUserAdmin}
        view="ADMIN_USERS"
        title="Tous les utilisateurs"
      />
    ),
    Instruments: (
      <BaseTable
        fn1={getInstrumentCount}
        fn2={getInstrumentAdmin}
        view="ADMIN_INSTRUMENTS"
        title="Tous les instruments"
      />
    ),
    Validation: (
      <BaseTable
        fn1={getCountToValidate}
        fn2={getInstrumentToValidate}
        view="ADMIN_VALIDATION"
        title="Instruments a valider"
      />
    ),
    Planning: <InProgress />,
    'Details du compte': <UserProfile />,
    Messages: <InProgress />,
    Deconnexion: '',
  };

  let headings;
  if (profile?.role === 'user') headings = userHeadings;
  if (profile?.role === 'owner') headings = ownerHeadings;
  if (profile?.role === 'admin') headings = adminHeadings;

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center mt-4">
        <div className="flex w-full items-center justify-end sm:hidden md:hidden lg:hidden">
          {
            <VscSettings
              onClick={() => setOpenSettings(!openSettings)}
              className={`pr-4 text-5xl cursor-pointer ${
                openSettings && 'text-main_color'
              }`}
            />
          }
        </div>
        <div className=" w-[85%] h-full max-w-[1400px]">
          <div className="flex justify-around w-[100%] h-[100%]">
            <div
              className={`flex flex-col min-h-[70vh] border-r-2 xs:shadow-2xl 2xs:shadow-2xl 3xs:shadow-2xl bg-white xs:z-20 2xs:z-20 3xs:z-20 border-border_color w-52 min-w-[200px] xs:h-[100vh] 2xs:h-[100vh] 3xs:h-[100vh] 3xs:fixed 3xs:top-0 3xs:left-0 2xs:fixed 2xs:top-0 2xs:left-0 xs:fixed xs:top-0 xs:left-0 ${
                !openSettings && 'xs:hidden 2xs:hidden 3xs:hidden'
              }`}
            >
              <img
                src={avatar}
                alt="avatar"
                className="w-16 h-16 self-center rounded-full mt-8 mb-4 sm:hidden md:hidden lg:hidden"
              />
              <div className="h-14 w-[95%] flex justify-between items-center border-b-2">
                <p className="text-[1.2em] pl-2"> MON COMPTE</p>
                <span>
                  {
                    <RxCrossCircled
                      onClick={() => setOpenSettings(false)}
                      className="bg-red-600 text-white cursor-pointer rounded-full text-xl sm:hidden md:hidden lg:hidden"
                    />
                  }
                </span>
              </div>
              {Object.keys(headings).map((head) => {
                return (
                  <div
                    key={head}
                    onClick={() => handleSelectHeading(head)}
                    className={`h-10 w-[80%] flex hover:text-main_color ${
                      activeHeading === head &&
                      'bg-slate-100 shadow-inner text-main_color'
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
            <div className=" w-[100%] flex justify-center h-[100%] max-w-[1000px] mb-8">
              <div className="w-[90%] h-[100%]">{headings[activeHeading]}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
