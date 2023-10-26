import Orders from "./Orders";
import Analytics from "./Analytics";
import Customers from "./Customers";
import Riders from "./Riders";


export default function Admindashboard({ currentUser, active }) {
  return (
    <>
      {active == "Orders" && <Orders currentUser={currentUser} />}
      {active == "Analytics" && <Analytics currentUser={currentUser} />}
      {active == "Customers" && <Customers currentUser={currentUser} />}
      {active == "Riders" && <Riders currentUser={currentUser} />}
    </>
  );
}
