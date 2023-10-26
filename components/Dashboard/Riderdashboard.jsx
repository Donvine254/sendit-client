import React from "react";
import MyDeliveries from "./MyDeliveries";
import GetOrders from "./GetOrders";
import RiderEarnings from "./Riderearnings";
export default function Riderdashboard({ currentUser, active, setActive }) {
  return (
    <>
      {active === "My Deliveries" && <MyDeliveries currentUser={currentUser} setActive={setActive} />}
      {active === "Get Orders" && <GetOrders  />}
      {active === "Earnings" && <RiderEarnings currentUser={currentUser} />}
    </>
  );
}
