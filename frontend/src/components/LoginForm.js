import React, { useState, useEffect } from "react";
import FormInput from "./input/FormInput";
import BasicButton from "./button/BasicButton";
import BasicCheckbox from "./checkbox/BasicCheckbox";

export default function LoginForm() {
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [credentials, setCredentials] = useState({ password: "", email: "" });
  function handleSubmit(e) {
    e.preventDefault();
    console.log(credentials);
  }
  return (
    <div className="w-[50%] flex justify-center items-center border-r-2 border-slate-200">
      <form className="w-[50%]" onSubmit={(e) => handleSubmit(e)}>
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
        <BasicCheckbox label="remember me" />
        <BasicButton text="Login" type="submit" />
      </form>
    </div>
  );
}
