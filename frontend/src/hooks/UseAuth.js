import React, { useState, useContext } from "react";
import { currentUserContext } from "../context/CurrentUserContext";
import { credentialsValidation, isEqual } from "../utils";
import { signin } from "../api/auth";

export default async function UseAuth() {
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const { setUserInfos } = useContext(currentUserContext);
  const [credentials, setCredentials] = useState({
    password: "",
    email: "",
    name: "",
    passwordConfirm: "",
  });
  setLoading(true);
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
    return {
      loading,
      credentialsErrors,
      setCredentialsErrors,
      credentials,
      setCredentials,
    };
  }
}
