import React from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import SignInForm from "../components/SignInForm";

export default function Login() {
  return (
    <Layout>
      <div className="w-full h-[80vh]">
        <div className="w-full h-24 items-center flex justify-around">
          <p>ENREGISTREMENT</p>
          <p>CONNEXION</p>
        </div>
        <div className="w-[100vw] mb-auto h-[60%] flex space-around">
          <SignInForm />
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
}
