"use client";
import React, { createContext, useContext, useState, useEffect} from "react";
import { registerUser} from "@/lib";
const AppContext = createContext("");

export const useAppContext=()=>useContext(AppContext)

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phone_number, setPhone_number]= useState("")
  const [pickupLocation, setPickupLocation] = useState();
  const [deliveryLocation, setDeliveryLocation] = useState();
  const [createdParcel, setCreatedParcel] = useState();
  const [parcelData, setParcelData] = useState({
    user_id:null,
    weight: null,
    description: "",
    value:"",
    pickup_address: "",
    pickup_notes: "",
    delivery_address:"",
    delivery_notes:"",
    receiver_name:"",
    receiver_contact:"",
    contact_person:""
  })
  const [orderData, setOrderData]=useState({
    price:0,
    distance:"",
    duration:"",
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
      const response = await fetch(`https://sendit.up.railway.app/users/${data.user.id}`)
      if(response.ok){
        const user = await response.json()
        setCurrentUser(user)
        setParcelData((prev)=>({
          ...prev,
          user_id:user.id,
        }))
      }
      else {
        registerUser(data, setCurrentUser);
      }
      
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
    setParcelData,
    phone_number, 
    setPhone_number,
    orderData,
    setOrderData,
    pickupLocation, 
    setPickupLocation,
    deliveryLocation, 
    setDeliveryLocation,
    createdParcel, 
    setCreatedParcel
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}


