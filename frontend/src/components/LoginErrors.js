import React from "react";

export default function LoginErrors({ errors }) {
  const msg = {
    password_err:
      "Le mot de passe doit etre entre 6 et 20 characteres et contenir une majuscules et une minuscule",
    name_err: "Le nom doit etre compose seulement de lettre",
    passwordMatch_err: "Le mot de passe et sa confirmation sont differents",
    email_err: "Email nom valide",
    missing_err: "Formulaire incomplet",
    user_exists_err: "Email existant",
    login_err: "Email ou mot de passe non valide(s)",
  };
  const err = Object.keys(errors);
  return (
    <div className="flex justify-center w-[100%]">
      <div className="text-[12px] h-7 text-main_color underline w-[80%] text-center mt-6">
        {msg[err[0]]}
      </div>
    </div>
  );
}
