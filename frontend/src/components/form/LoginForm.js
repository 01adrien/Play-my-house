import React, { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { user } from "../../store/user";
import FormInput from "../input/FormInput";
import BasicButton from "../button/BasicButton";
import BasicCheckbox from "../checkbox/BasicCheckbox";
import LoginErrors from "../LoginErrors";
import useAuth from "../../hooks/useAuth";
import withLoading from "../../HOC/withLoading";
import Text from "../Text";

const TextBtnWithLoading = withLoading(Text);

export default function LoginForm() {
  const setProfile = useSetRecoilState(user);
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [credentials, setCredentials] = useState({ password: "", email: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (true) {
      useAuth(credentials, login).then(
        ({ profile, loading, credentialsErrors }) => {
          setLoading(loading);
          setProfile(profile);
          setCredentialsErrors(credentialsErrors);
          if (profile) navigate("/user");
        }
      );
    }
  }
  return (
    <div className="flex-col items-center justify-center w-[50%]">
      <div className="w-[100%] flex items-center justify-center border-r-2 border-slate-200">
        <form className="w-[50%] flex-col" onSubmit={(e) => handleSubmit(e)}>
          <FormInput
            testId="email-login"
            name="email"
            type="email"
            id="email-login"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, email: e.target.value });
            }}
            value={credentials.email}
          />
          <FormInput
            testId="password-login"
            name="mot de passe"
            type="password"
            id="password-login"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, password: e.target.value });
            }}
            value={credentials.password}
          />
          <BasicCheckbox label="remember me" style={"pb-2"} />
          <BasicButton
            testId="submit-login"
            style={loading && "border-2 border-slate-700 "}
            type="submit"
            width="40"
          >
            <TextBtnWithLoading text={"Login"} loading={loading} />
          </BasicButton>
        </form>
      </div>
      {credentialsErrors && <LoginErrors errors={credentialsErrors} />}
    </div>
  );
}
