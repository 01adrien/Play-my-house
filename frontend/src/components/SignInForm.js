import React, { useState, useEffect, useContext } from "react";
import FormInput from "./input/FormInput";
import BasicCheckbox from "./checkbox/BasicCheckbox";
import Spinner from "./Spinner";
import LoginErrors from "./LoginErrors";
import BasicButton from "./button/BasicButton";
import { signin } from "../api/auth";
import { credentialsValidation, isEqual } from "../utils";
import { currentUserContext } from "../context/CurrentUserContext";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const { setUserInfos } = useContext(currentUserContext);
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
          console.log(data);
          setUserInfos((infos) => {
            return { ...infos, data };
          });
          if (!data.granted) setCredentialsErrors(data);
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
            id="name"
            fn={(e) => {
              setCredentials({ ...credentials, name: e.target.value });
              setCredentialsErrors({});
            }}
            value={credentials.name}
          />
          <FormInput
            name="email*"
            type="email"
            id="email"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, email: e.target.value });
            }}
            value={credentials.email}
          />
          <FormInput
            name="mot de passe*"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, password: e.target.value });
            }}
            value={credentials.password}
          />
          <FormInput
            name="confirmation mot de passe*"
            type="password"
            id="password-confirm"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({
                ...credentials,
                passwordConfirm: e.target.value,
              });
            }}
            value={credentials.passwordConfirm}
          />
          <BasicCheckbox
            style={loading && "border-2 border-slate-700 "}
            label="remember me"
          />
          <BasicButton text={loading ? <Spinner /> : "Signin"} type="submit" />
        </form>
      </div>
      {credentialsErrors && <LoginErrors errors={credentialsErrors} />}
    </div>
  );
}
