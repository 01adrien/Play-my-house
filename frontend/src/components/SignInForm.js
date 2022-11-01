import React, { useState, useEffect } from "react";
import FormInput from "./input/FormInput";
import BasicCheckbox from "./checkbox/BasicCheckbox";
import BasicButton from "./button/BasicButton";
import { signin, getUsers } from "../api/auth";
import { credentialsValidation } from "../utils";

export default function SignInForm() {
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [credentials, setCredentials] = useState({
    password: "",
    email: "",
    name: "",
    passwordConfirm: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    delete credentials.passwordConfirm;
    setCredentialsErrors(credentialsValidation(credentials));
    await signin(credentials)
      .then(({ data }) => console.log(data))
      .catch((e) => console.log(e));
  }
  return (
    <div className="w-[50%] flex items-center justify-center border-r-2 border-slate-200">
      <form className="w-[50%]" onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          name="nom"
          type="text"
          id="name"
          fn={(e) => setCredentials({ ...credentials, name: e.target.value })}
          value={credentials.name}
        />
        <FormInput
          name="email"
          type="email"
          id="email"
          fn={(e) => setCredentials({ ...credentials, email: e.target.value })}
          value={credentials.email}
        />
        <FormInput
          name="mot de passe"
          type="password"
          id="password"
          fn={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          value={credentials.password}
        />
        <FormInput
          name="confirmation mot de passe"
          type="password"
          id="password-confirm"
          fn={(e) =>
            setCredentials({ ...credentials, passwordConfirm: e.target.value })
          }
          value={credentials.passwordConfirm}
        />
        <BasicCheckbox label="remember me" />
        <BasicButton text="Signin" type="submit" />
      </form>
    </div>
  );
}
