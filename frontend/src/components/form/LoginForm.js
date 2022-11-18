import React, { useState, useEffect, useContext } from "react";
import FormInput from "../input/FormInput";
import BasicButton from "../button/BasicButton";
import BasicCheckbox from "../checkbox/BasicCheckbox";
import LoginErrors from "../LoginErrors";
import { login } from "../../api/auth";
import { getProfile } from "../../api/user";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [credentials, setCredentials] = useState({ password: "", email: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const { password, email } = credentials;
    if (true) {
      await login({ email: email, password: password })
        .then(({ data }) => {
          if (!data.granted) setCredentialsErrors(data);
          if (data.granted) {
            getProfile()
              .then(setUser)
              .then(() => navigate("/user"));
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }
  return (
    <div className="flex-col items-center justify-center w-[50%]">
      <div className="w-[100%] flex items-center justify-center border-r-2 border-slate-200">
        <form className="w-[50%] flex-col" onSubmit={(e) => handleSubmit(e)}>
          <FormInput
            name="email"
            type="email"
            id="email"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, email: e.target.value });
            }}
            value={credentials.email}
          />
          <FormInput
            name="mot de passe"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, password: e.target.value });
            }}
            value={credentials.password}
          />
          <BasicCheckbox label="remember me" />
          <BasicButton
            style={loading && "border-2 border-slate-700 "}
            text={loading ? <Spinner /> : "Login"}
            type="submit"
          />
        </form>
      </div>
      {credentialsErrors && <LoginErrors errors={credentialsErrors} />}
    </div>
  );
}
