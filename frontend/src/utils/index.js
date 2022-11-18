export function credentialsValidation(credentials) {
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
}

export const isEqual = (a, b) => a === b;

export const localStoreAnything = (object) =>
  Object.keys(object).map((item) => localStorage.setItem(item, object[item]));
