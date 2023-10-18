"use client";
import React, { createContext, useContext, useState, useEffect} from "react";
import { registerUser } from "@/lib";
const AppContext = createContext("");

export const useAppContext=()=>useContext(AppContext)

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

//fetch the currentUser and setCurrentUser when pages that use context load:
useEffect(() => {
  const getKindeSession= async ()=>{
    const res = await fetch("/api/kindeSession");
    const data= await res.json();
    console.log(data.authenticated) //logs false
    if (data.authenticated=== false){
      console.log("no logged in user");//does not log anything
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

// useEffect(() => {
//   const getKindeSession = async () => {
//     try {
//       const res = await fetch("/api/kindeSession");
//       const data= await res.json();
//       console.log(data);
//       // if (res.status === 200) {
//       //   const data = await res.json();
//       //   setIsAuthenticated(data.authenticated);
//       //   setIsAdmin(data.isAdmin);
//       //   if (data.authenticated) {
        
//       //     registerUser(data, setIsAdmin, setCurrentUser);
//       //     setCurrentUser(data.user);
//       //   } else {
//       //     // Handle the case when there is no logged-in user.
//       //     setIsAdmin(false);
//       //     setCurrentUser(null);
//       //   }
//       // } else {
//       //   // Handle other response statuses (e.g., 401 for unauthorized) if needed
//       //   setIsAuthenticated(false);
//       //   setIsAdmin(false);
//       //   setCurrentUser(null);
//       }
//     } catch (error) {
//       console.error("Error fetching user session:", error);
//       // Handle the error appropriately, e.g., show an error message.
//     }
//   };

//   getKindeSession();
// }, []);




  const context = {
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}


