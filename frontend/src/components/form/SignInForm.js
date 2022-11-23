import React, { useState, useEffect, useContext } from "react";
import FormInput from "../input/FormInput";
import BasicCheckbox from "../checkbox/BasicCheckbox";
import Spinner from "../Spinner";
import LoginErrors from "../LoginErrors";
import BasicButton from "../button/BasicButton";
import { signin } from "../../api/auth";
import { credentialsValidation, isEqual } from "../../utils";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/user";
import { useSetRecoilState } from "recoil";
import { user } from "../../store/user";

export default function SignInForm() {
  const setProfile = useSetRecoilState(user);
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    password: "",
    email: "",
    name: "",
    passwordConfirm: "",
  });

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    setCredentialsErrors(credentialsValidation(credentials));
    const { password, passwordConfirm, name, email } = credentials;

    if (!isEqual(password, passwordConfirm)) {
      setCredentialsErrors({ passwordMatch_err: true });
    }
    if (true) {
      await signin({ email: email, password: password, name: name })
        .then(({ data }) => {
          if (!data.granted) setCredentialsErrors(data);
          if (data.granted) {
            getProfile()
              .then((u) => setProfile(u))
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
            name="nom*"
            type="text"
            id="name-signin"
            fn={(e) => {
              setCredentials({ ...credentials, name: e.target.value });
              setCredentialsErrors({});
            }}
            value={credentials.name}
          />
          <FormInput
            name="email*"
            type="email"
            id="email-signin"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, email: e.target.value });
            }}
            value={credentials.email}
          />
          <FormInput
            name="mot de passe*"
            type="password"
            id="password-signin"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, password: e.target.value });
            }}
            value={credentials.password}
          />
          <FormInput
            name="confirmation mot de passe*"
            type="password"
            id="password-confirm-signin"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({
                ...credentials,
                passwordConfirm: e.target.value,
              });
            }}
            value={credentials.passwordConfirm}
          />
          <BasicCheckbox style={"pb-2"} label="remember me" />
          <BasicButton
            text={loading ? <Spinner /> : "Signin"}
            type="submit"
            style={loading && "border-2 border-slate-700 "}
          />
        </form>
      </div>
      {credentialsErrors && <LoginErrors errors={credentialsErrors} />}
    </div>
  );
}
