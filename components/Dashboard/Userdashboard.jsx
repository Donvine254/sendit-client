import MyOrders from "./MyOrders";

export default function  Userdashboard({ currentUser, active }) {
  
  return (
    <>
      {active === "My Orders" && (
        <MyOrders currentUser={currentUser}/>
      )}
    </>
  );
}
