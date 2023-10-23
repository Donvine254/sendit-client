"use client";
import { useState } from "react";
import { useAppContext } from "@/context/context";
import Loading from "../../components/loading";
import { Toolbar, Userdashboard } from "@/components/Dashboard";

export default function Dashboard() {
  const { currentUser } = useAppContext();
  const [active, setActive] = useState(); //use this to dynamically render dashboards
  return (
    <section className="mx-4 p-2 min-w-[500px]">
      {currentUser ? (
        <>
          {" "}
          <Toolbar
            role={currentUser.role ?? "user"}
            active={active}
            setActive={setActive}
          />
          {currentUser.role==="user"&& <Userdashboard currentUser={currentUser}  active={active} />}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </section>
  );
}
