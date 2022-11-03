import React, { createContext, useState } from "react";

export const currentUserContext = createContext();

export default function CurrentUserContextprovider({ children }) {
  const [userInfos, setUserInfos] = useState({ name: "test" });
  return (
    <currentUserContext.Provider value={{ userInfos, setUserInfos }}>
      {children}
    </currentUserContext.Provider>
  );
}
