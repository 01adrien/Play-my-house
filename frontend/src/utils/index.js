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

export const makeSuccesToast = (styles, msg) => {
  return toast.success(msg, {
    style: {
      border: styles?.border || '2px solid green',
      padding: styles?.padding || '16px',
      color: styles?.color || 'green',
    },
    iconTheme: {
      primary: styles?.primary || 'green',
      secondary: styles?.secondary || 'white',
    },
  });
};

export const scrollUp = () => {
  window.scroll({
    top: 100,
    left: 100,
    behavior: 'smooth',
  });
};

export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((res, fn) => fn(res), x);

export const daysTraduction = {
  monday: 'lundi',
  tuesday: 'mardi',
  wednesday: 'mercredi',
  thursday: 'jeudi',
  friday: 'vendredi',
  saturday: 'samedi',
  sunday: 'dimanche',
};
