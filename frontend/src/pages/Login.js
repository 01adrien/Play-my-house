import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/form/LoginForm';
import SigninFormOwner from '../components/form/SigninFormOwner';
import SigninFormUser from '../components/form/SigninFormUser';
import { useRecoilValue } from 'recoil';
import { user } from '../store/user';
import Footer from '../components/Footer';
import FormCarousel from '../components/form/FormCarousel';

export default function Login() {
  const profile = useRecoilValue(user);
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-[70vh] w-full min-w-[300px]">
        <FormCarousel>
          <SigninFormUser />
          <SigninFormOwner />
          <LoginForm />
        </FormCarousel>
      </div>
    </Layout>
  );
}
