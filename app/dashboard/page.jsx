"use client";
import { useState } from "react";
import { useAppContext } from "@/context/context";
import Loading from "../../components/loading";
import { Toolbar, Userdashboard, Settings } from "@/components/Dashboard";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { currentUser } = useAppContext();
  const [active, setActive] = useState("Settings");
  //redirect to the active pages
  if (active === "Help Center") {
    redirect("/contact");
  } else if (active === "Send Parcel") {
    redirect("/deliveries");
  }
  return (
    <section className="p-2 md:min-h-[500px]">
      {currentUser ? (
        <>
          {" "}
          <Toolbar
            role={currentUser.role ?? "user"}
            active={active}
            setActive={setActive}
          />
          {active === "Settings" && <Settings currentUser={currentUser} />}
          {currentUser.role === "user" || currentUser.role==="admin" && (
            <Userdashboard currentUser={currentUser} active={active} />
          )}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </section>
  );
}
