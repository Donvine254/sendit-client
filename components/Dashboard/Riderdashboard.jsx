import React from "react";
import MyDeliveries from "./MyDeliveries"
export default function Riderdashboard({currentUser, active}) {
  return (
    <>
    {active ==="My Deliveries" && <MyDeliveries currentUser={currentUser}/>}
    </>
  )
}
