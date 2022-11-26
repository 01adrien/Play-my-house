import React, { useState, useEffect } from "react";
import BasicButton from "./button/BasicButton";
import FormInput from "./input/FormInput";
import LoginErrors from "./LoginErrors";
import Spinner from "./icons/Spinner";
import { getPicture, uploadPicture } from "../api/user";
import FileInput from "./input/FileInput";
import { user } from "../store/user";
import { useRecoilState } from "recoil";
import withLoading from "../HOC/withLoading";
import { Picture } from "./Picture";
import Upload from "./icons/Upload";

const PictureWithLoading = withLoading(Picture);

export default function UserProfile() {
  const [picture, setPicture] = useState({ src: null });
  const [loading, setLoading] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(true);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadImg, setIsUploadImg] = useState(false);
  const [credentials, setCredentials] = useState({});
  const [profile, setProfile] = useRecoilState(user);

  const { name, email, picture_id, id, role, picture_name } = profile;
  useEffect(() => {
    getPicture(picture_id, picture_name).then(({ data }) => {
      setPicture({ src: data });
      setPictureLoading(false);
    });
  }, [isUploadImg]);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function hamdleSubmitUpload(e) {
    setPictureLoading(true);
    e.preventDefault(e);
    setPicture({ src: null });
    uploadPicture({ name, id, selectedFile, picture_id }).then(({ data }) => {
      setIsUploadImg(!isUploadImg);
      setProfile({ ...profile, ...data });
      setPictureLoading(false);
    });
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
            fn={(e) => {}}
            value={name}
          />
          <FormInput
            required={false}
            name="email"
            type="email"
            id="email"
            fn={(e) => {
              setCredentialsErrors({});
            }}
            value={email}
          />
          <FormInput
            required={false}
            name="mot de passe actuel"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
            }}
            value={credentials.email}
          />
          <FormInput
            required={false}
            name="nouveau mot de passe"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
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
            }}
            value={credentials.newPasswordConfirm}
          />
          <div className="pt-3 flex justify-center w-[100%]">
            <div className="w-[60%]">
              <BasicButton
                style={loading && "border-2 border-slate-700 "}
                type="submit"
              >
                {loading ? <Spinner /> : <p>Enregistrer</p>}
              </BasicButton>
            </div>
          </div>
        </form>
      </div>
      <form
        onSubmit={(e) => hamdleSubmitUpload(e)}
        className=" w-[60%] h-[45vh] flex flex-col justify-between items-center"
      >
        <FileInput setSelectedFile={setSelectedFile} />

        <div className="w-60 h-56 flex justify-center items-center">
          <PictureWithLoading
            loading={pictureLoading}
            src={picture?.src}
            alt={"profil-picture"}
            style={"rounded-xl w-60 h-56"}
          />
        </div>
        <BasicButton width="40" type="submit">
          {!picture?.src ? <Spinner /> : <Upload />}
        </BasicButton>
      </form>
    </div>
  );
}
