"use client";
import React, { createContext, useContext, useState, useEffect} from "react";
import { registerUser } from "@/lib";
const AppContext = createContext("");

export const useAppContext=()=>useContext(AppContext)

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [parcelData, setParcelData] = useState({
    weight: "",
    description: "",
    pickup_address: "",
    pickup_notes: "",
    delivery_address:"",
    delivery_notes:"",
    distance:"",
    duration:"",
    receiver_name:"",
    receiver_contact:"",
    phone_number:""
  })

//fetch the currentUser and setCurrentUser when pages that use context load:
useEffect(() => {
  const getKindeSession= async ()=>{
    const res = await fetch("/api/kindeSession");
    const data= await res.json();
    if (data.authenticated=== false){
      //do something
    }
    else {
      setIsAuthenticated(data.authenticated)
      setIsAdmin(data.isAdmin)
      setCurrentUser(data.user)
      registerUser(data, setCurrentUser);
    }
  }
  getKindeSession();

}, [])

  const context = {
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
    isAuthenticated,
    setIsAuthenticated,
    parcelData,
    setParcelData
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}


