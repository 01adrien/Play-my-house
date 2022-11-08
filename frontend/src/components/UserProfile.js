import React, { useContext, useState, useEffect } from "react";
import { currentUserContext } from "../context/CurrentUserContext";
import BasicButton from "./button/BasicButton";
import FormInput from "./input/FormInput";
import LoginErrors from "./LoginErrors";
import Spinner from "./Spinner";
import { getPicture, uploadPicture } from "../api/user";
import FileInput from "./input/FileInput";
import whiteBG from "../assets/fond_blanc.jpeg";

export default function UserProfile({ userInfos }) {
  // const { setUserInfos, userInfos } = useContext(currentUserContext);
  const [picture, setPicture] = useState({ src: whiteBG });
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadImg, setIsUploadImg] = useState(false);
  const [credentials, setCredentials] = useState({
    password: "",
    email: userInfos.email,
    name: userInfos.name,
    newPassword: "",
    newPasswordConfirm: "",
  });

  const { name, keypass, id, picture_id } = userInfos;
  useEffect(() => {
    getPicture(userInfos.picture_id)
      .then(({ data }) => {
        setPicture({ src: data });
      })
      .catch(console.log);
  }, [isUploadImg]);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function hamdleSubmitUpload(e) {
    setPicture({ src: whiteBG });
    e.preventDefault(e);
    uploadPicture({ name, keypass, id, selectedFile, picture_id })
      .then(({ data }) => {
        console.log(data);
        setIsUploadImg(!isUploadImg);
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }
  return (
    <div className="flex flex-row justify-between items-center w-[100%]">
      <div className="flex flex-col pl-12 w-[55%]">
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
      <form
        onSubmit={(e) => hamdleSubmitUpload(e)}
        className=" w-[60%] h-[45vh] flex flex-col justify-between items-center"
      >
        <FileInput setSelectedFile={setSelectedFile} />
        <img className="w-60 h-56 rounded" alt="avatar" src={picture.src} />
        <BasicButton
          width="40"
          text={
            picture.src === whiteBG ? (
              <Spinner />
            ) : (
              <svg
                class="w-8 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
            )
          }
          type="submit"
        />
      </form>
    </div>
  );
}
