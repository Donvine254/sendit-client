"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext("");

export const useAppContext=()=>useContext(AppContext)

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAutheticated, setIsAutheticated] = useState(false);
  const context = {
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
    isAutheticated,
    setIsAutheticated,
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}


