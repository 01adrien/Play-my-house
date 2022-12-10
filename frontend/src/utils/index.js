import toast from 'react-hot-toast';

export const credentialsValidation = (credentials) => {
  const errors = {};
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // entre 6 et 20 char 1 num 1 upper 1 lower
  const nameRegex = /^[a-zA-Z-' ]*$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!credentials.password.match(passwordRegex)) errors.password_err = true;
  if (credentials.name.length > 20 || credentials.name.length < 3)
    errors.name_err = true;
  if (!credentials.name.match(nameRegex)) errors.name_err = true;
  if (!credentials.email.match(emailRegex)) errors.email_err = true;
  return errors;
};

export const isEqual = (a, b) => a === b;

const makeToast = (type) => (styles, msg) => {
  return toast(msg, {
    style: {
      border:
        styles?.border || type === 'succes'
          ? '2px solid green'
          : '2px solid red',
      padding: styles?.padding || '16px',
      color: styles?.color || type === 'succes' ? 'green' : 'red',
      textAlign: 'center',
    },
    iconTheme: {
      primary: styles?.primary || type === 'succes' ? 'green' : 'red',
      secondary: styles?.secondary || 'white',
    },
  });
};

export const makeSuccesToast = makeToast('succes');
export const makeErrorToast = makeToast('error');

export const scrollUp = () => {
  window.scroll({
    top: 100,
    behavior: 'smooth',
  });
};

export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((res, fn) => fn(res), x);
