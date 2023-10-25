import React from "react";
import MyDeliveries from "./MyDeliveries";
import GetOrders from "./GetOrders";
import RiderEarnings from "./Riderearnings";
export default function Riderdashboard({ currentUser, active }) {
  return (
    <>
      {active === "My Deliveries" && <MyDeliveries currentUser={currentUser} />}
      {active === "Get Orders" && <GetOrders />}
      {active === "Earnings" && <RiderEarnings currentUser={currentUser} />}
    </>
  );
}
