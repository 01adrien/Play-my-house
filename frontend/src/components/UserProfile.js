import React, { useContext, useState, useEffect } from "react";
import { currentUserContext } from "../context/CurrentUserContext";
import BasicButton from "./button/BasicButton";
import FormInput from "./input/FormInput";
import LoginErrors from "./LoginErrors";
import Spinner from "./Spinner";
import { getPictureName, getPicture } from "../api/userPicture";

export default function UserProfile({ userInfos }) {
  // const { setUserInfos, userInfos } = useContext(currentUserContext);
  const [picture, setPicture] = useState({ src: null });
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [credentials, setCredentials] = useState({
    password: "",
    email: userInfos.email,
    name: userInfos.name,
    newPassword: "",
    newPasswordConfirm: "",
  });

  console.log(userInfos);
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    getPictureName(userInfos.picture_id)
      .then(({ data }) => {
        console.log(data);
        getPicture(data)
          .then(({ data }) => {
            console.log(data);
            setPicture({ src: data });
          })
          .catch(console.log);
      })
      .catch(console.log);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }
  return (
    <div className="flex flex-row justify-between items-center w-[100%]">
      <div className="flex flex-col pl-12 w-[50%]">
        <form onSubmit={(e) => handleSubmit(e)} className="w-[100%]">
          <FormInput
            required={false}
            name="nom"
            type="text"
            id="name"
            fn={(e) => {
              setCredentials({ ...credentials, name: e.target.value });
            }}
            value={credentials.name}
          />
          <FormInput
            required={false}
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
            required={false}
            name="mot de passe actuel"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, password: e.target.value });
            }}
            value={credentials.password}
          />
          <FormInput
            required={false}
            name="nouveau mot de passe"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({ ...credentials, newPassword: e.target.value });
            }}
            value={credentials.newPassword}
          />
          <FormInput
            required={false}
            name="confirmation nouveau mot de passe"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials({
                ...credentials,
                newPasswordConfirm: e.target.value,
              });
            }}
            value={credentials.newPasswordConfirm}
          />
          <div className="pt-3 flex justify-center w-[100%]">
            <div className="w-[60%]">
              <BasicButton
                style={loading && "border-2 border-slate-700 "}
                text={loading ? <Spinner /> : "Enregistrer"}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
      <div className=" w-[60%] flex justify-center">
        {picture.src ? (
          <img className="w-60 h-56 rounded" alt="avatar" src={picture.src} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
