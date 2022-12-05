import React, { useState } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/form/LoginForm';
import SigninFormOwner from '../components/form/SigninFormOwner';
import SigninFormUser from '../components/form/SigninFormUser';
import { useRecoilValue } from 'recoil';
import { user } from '../store/user';
import Footer from '../components/Footer';
import BasicButton from '../components/button/BasicButton';

export default function Login() {
  const profile = useRecoilValue(user);
  const [toShow, setToShow] = useState('MENU');

  return (
    <Layout>
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        {toShow === 'SIGNIN_USER' && <SigninFormUser close={setToShow} />}
        {toShow === 'SIGNIN_OWNER' && <SigninFormOwner close={setToShow} />}
        {toShow === 'LOGIN' && <LoginForm close={setToShow} />}
        {toShow === 'MENU' && (
          <div className="w-80 border-2 border-slate-200 rounded-lg shadow-md h-[70%] flex flex-col justify-around items-center">
            <BasicButton
              type="button"
              style="w-48 hover:scale-105"
              onClick={() => setToShow('SIGNIN_USER')}
            >
              <p>Signin User</p>
            </BasicButton>
            <BasicButton
              type="button"
              style="w-48 hover:scale-105"
              onClick={() => setToShow('SIGNIN_OWNER')}
            >
              <p>Signin Owner</p>
            </BasicButton>
            <BasicButton
              type="button"
              style="w-48 hover:scale-105"
              onClick={() => setToShow('LOGIN')}
            >
              <p>Login</p>
            </BasicButton>
          </div>
        )}
        {/* <Footer /> */}
      </div>
    </Layout>
  );
}
