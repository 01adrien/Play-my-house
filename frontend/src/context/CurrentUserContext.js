import React, { createContext, useState } from "react";

export const currentUserContext = createContext();

export default function CurrentUserContextprovider({ children }) {
  const [infosUser, setInfosUser] = useState();
  return (
    <currentUserContext.Provider value={{ infosUser, setInfosUser }}>
      {children}
    </currentUserContext.Provider>
  );
}
