import React, { useState } from 'react';
import FormInput from '../input/FormInput';
import Spinner from '../icons/Spinner';
import LoginErrors from '../LoginErrors';
import BasicButton from '../button/BasicButton';
import { signin } from '../../api/auth';
import { credentialsValidation, isEqual, makeSuccesToast } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { user } from '../../store/user';
import useAuth from '../../hooks/useAuth';

export default function SigninFormOwner() {
  const setProfile = useSetRecoilState(user);
  const [loading, setLoading] = useState(false);
  const [credentialsErrors, setCredentialsErrors] = useState({});
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    password: '',
    email: '',
    name: '',
    passwordConfirm: '',
    telephone: '',
    address: '',
    city: '',
  });

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    setCredentialsErrors(credentialsValidation(credentials));
    const { password, passwordConfirm } = credentials;

    if (!isEqual(password, passwordConfirm)) {
      setCredentialsErrors({ passwordMatch_err: true });
      return setLoading(false);
    }
    if (true) {
      useAuth({ role: 'owner', ...credentials }, signin).then(
        ({ profile, loading, credentialsErrors }) => {
          setLoading(loading);
          setProfile(profile);
          setCredentialsErrors(credentialsErrors);
          if (profile) {
            makeSuccesToast(
              {},
              'Compte cree avec succes, vous allez etre redirige !'
            );
            setTimeout(() => navigate('/user'), 2500);
          }
        }
      );
    }
  }

  return (
    <div className="flex-col items-center justify-center w-[50%] min-w-[250px] mt-4">
      <div className="w-[100%] flex items-center justify-center ">
        <form
          className="w-[50%] min-w-[250px] flex-col "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex justify-between">
            <FormInput
              name="nom*"
              type="text"
              id="name-signin"
              style="w-20"
              fn={(e) => {
                setCredentials({ ...credentials, name: e.target.value });
                setCredentialsErrors({});
              }}
              value={credentials.name}
            />
            <FormInput
              name="telephone*"
              type="text"
              id=""
              style="w-36"
              fn={(e) => {
                setCredentialsErrors({});
                setCredentials({ ...credentials, telephone: e.target.value });
              }}
              value={credentials.telephone}
            />
          </div>
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
          <div className="flex justify-between">
            <FormInput
              name="ville*"
              type="text"
              id="email-signin"
              style="w-20"
              fn={(e) => {
                setCredentialsErrors({});
                setCredentials({ ...credentials, city: e.target.value });
              }}
              value={credentials.city}
            />
            <FormInput
              name="adresse*"
              type="text"
              id=""
              style="w-36"
              fn={(e) => {
                setCredentialsErrors({});
                setCredentials({ ...credentials, address: e.target.value });
              }}
              value={credentials.address}
            />
          </div>
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
          <div className="w-full mt-8 flex justify-center">
            <BasicButton
              type="submit"
              style={`w-60 ${loading && 'border-2 border-slate-700'}`}
            >
              <p>{loading ? <Spinner /> : 'signin'}</p>
            </BasicButton>
          </div>
        </form>
      </div>
      {credentialsErrors && <LoginErrors errors={credentialsErrors} />}
    </div>
  );
}
