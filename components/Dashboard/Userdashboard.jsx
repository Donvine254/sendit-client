import Settings from "./settings";

export default function  Userdashboard({ currentUser, active }) {
  
  return (
    <>
      {active == "Settings" && (
        <Settings currentUser={currentUser}/>
      )}
    </>
  );
}
