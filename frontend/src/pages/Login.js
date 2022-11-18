import React from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/form/LoginForm";
import SignInForm from "../components/form/SignInForm";

export default function Login({ setUser, user }) {
  return (
    <Layout setUser={setUser} user={user}>
      <div className="w-full h-[80vh]">
        <div className="w-full h-24 items-center flex justify-around">
          <p>ENREGISTREMENT</p>
          <p>CONNEXION</p>
        </div>
        <div className="w-[100vw] mb-auto h-[60%] flex space-around">
          <SignInForm setUser={setUser} />
          <LoginForm setUser={setUser} />
        </div>
        <div>{JSON.stringify(user)}</div>
      </div>
    </Layout>
  );
}
