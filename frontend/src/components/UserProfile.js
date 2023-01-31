import React, { useState, useEffect } from 'react';
import BasicButton from './button/BasicButton';
import FormInput from './input/FormInput';
import LoginErrors from './LoginErrors';
import {
  credentialsValidation,
  isEqual,
  makeSuccesToast,
  makeErrorToast,
} from '../utils';
import {
  getPicture,
  uploadPicture,
  modifyProfil,
  getProfile,
} from '../api/user';
import FileInput from './input/FileInput';
import { user } from '../store/user';
import { useRecoilState } from 'recoil';
import withLoading from '../HOC/withLoading';
import { Picture } from './Picture';
import Upload from './icons/Upload';
import { Spinner } from 'flowbite-react';

const PictureWithLoading = withLoading(Picture);

export default function UserProfile() {
  const [picture, setPicture] = useState({ src: null });
  const [loading, setLoading] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadImg, setIsUploadImg] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const [profile, setProfile] = useRecoilState(user);

  const {
    name,
    email,
    picture_id,
    id,
    role,
    picture_name,
    telephone,
    address,
    city,
  } = profile;

  const [credentials, setCredentials] = useState({
    id: parseInt(id),
    name: name || '',
    email: email || '',
    telephone: telephone || '',
    address: address || '',
    city: city || '',
    role: role || '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  useEffect(() => {
    getPicture(picture_id, picture_name)
      .then(({ data }) => {
        setPicture({ src: data });
        setPictureLoading(false);
      })
      .catch(() => {});
  }, [isUploadImg]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { newPassword, newPasswordConfirm } = credentials;
    setLoading(true);
    setCredentialsErrors(credentialsValidation(credentials));
    if (newPassword || newPasswordConfirm) {
      if (
        !newPassword ||
        !newPasswordConfirm ||
        !isEqual(newPassword, newPasswordConfirm)
      ) {
        setCredentialsErrors({ passwordMatch_err: true });
        return setLoading(false);
      }
    }

    modifyProfil(credentials)
      .then((data) => {
        if (data?.errors) setCredentialsErrors(data.errors);
        if (data?.status === 'succes') {
          setProfile(data?.user);
          makeSuccesToast({}, data?.msg);
        }
        if (data?.status === 'fail') {
          setProfile(data?.user);
          makeErrorToast({}, data?.msg);
        }
        setLoading(false);
      })
      .catch(() => {});
  }

  async function handleSubmitUpload(e) {
    setPictureLoading(true);
    e.preventDefault(e);
    setPicture({ src: null });
    uploadPicture({ name, id, selectedFile, picture_id })
      .then(({ data }) => {
        setIsUploadImg(!isUploadImg);
        setProfile({ ...profile, ...data });
        getProfile().then(setProfile);
        setPictureLoading(false);
      })
      .catch(() => makeErrorToast({}, 'Echec upload, reesayez plus tard'));
  }
  return (
    <div
      className={`flex justify-between sm:flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row items-center w-[100%] xs:flex-col-reverse 2xs:flex-col-reverse 3xs:flex-col-reverse`}
    >
      <div className="flex flex-col w-[55%] min-w-[200px]">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-[100%] max-w-[400px] min-w-[200px] mt-6"
        >
          <FormInput
            required={true}
            name="Nom"
            type="text"
            id="name"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            value={credentials?.name || name || ''}
          />
          <FormInput
            required={true}
            name="Email"
            type="email"
            id="email"
            style={'bg-gray-50'}
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            value={credentials?.email || email || ''}
          />
          {role === 'owner' && (
            <div className="flex justify-between">
              <FormInput
                required={true}
                name="Telephone"
                type="text"
                id="tel"
                style={'w-[35%]'}
                fn={(e) => {
                  setCredentialsErrors({});
                  setCredentials((prev) => ({
                    ...prev,
                    telephone: e.target.value,
                  }));
                }}
                value={credentials?.telephone || telephone || ''}
              />
              <FormInput
                required={true}
                name="Ville"
                type="text"
                id="city"
                style={'w-[55%]'}
                fn={(e) => {
                  setCredentialsErrors({});
                  setCredentials((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }));
                }}
                value={credentials?.city || city || ''}
              />
            </div>
          )}
          {role === 'owner' && (
            <FormInput
              required={true}
              name="Adresse"
              type="text"
              id="text"
              fn={(e) => {
                setCredentialsErrors({});
                setCredentials((prev) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
              value={credentials?.address || address || ''}
            />
          )}
          <FormInput
            required={false}
            name="Mot de passe actuel"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            value={credentials?.password || ''}
          />
          <FormInput
            required={false}
            name="Nouveau mot de passe"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }));
            }}
            value={credentials?.newPassword || ''}
          />
          <FormInput
            required={false}
            name="Confirmation nouveau mot de passe"
            type="password"
            id="password"
            fn={(e) => {
              setCredentialsErrors({});
              setCredentials((prev) => ({
                ...prev,
                newPasswordConfirm: e.target.value,
              }));
            }}
            value={credentials?.newPasswordConfirm || ''}
          />
          <div className="pt-3 flex justify-center w-[100%]">
            <div className="w-[60%]">
              <BasicButton
                style={loading && 'border-2 border-slate-700 '}
                type="submit"
              >
                {loading ? <Spinner /> : <p>Enregistrer</p>}
              </BasicButton>
            </div>
          </div>
          {credentialsErrors && <LoginErrors errors={credentialsErrors} />}
        </form>
      </div>
      <form
        onSubmit={(e) => handleSubmitUpload(e)}
        className=" w-[60%] h-[45vh] min-w-[300px] flex flex-col justify-between items-center"
      >
        <FileInput setSelectedFile={setSelectedFile} />

        <div className="w-60 h-56 flex justify-center items-center">
          <PictureWithLoading
            loading={pictureLoading}
            src={picture?.src}
            alt={'profil-picture'}
            style={'rounded-xl w-60 h-56'}
          />
        </div>
        <BasicButton width="[80px]" type="submit">
          {pictureLoading ? <Spinner /> : <Upload />}
        </BasicButton>
      </form>
    </div>
  );
}
